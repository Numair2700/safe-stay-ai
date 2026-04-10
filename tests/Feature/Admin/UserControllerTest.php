<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_users_list(): void
    {
        // Given an admin user and other users
        $admin = User::factory()->create(['role' => 'admin']);
        $host = User::factory()->host()->create();
        $guest = User::factory()->guest()->create();

        // When admin visits /admin/users
        $response = $this->actingAs($admin)->get(route('admin.users.index'));

        // Then API returns all users (no UI component, backend only)
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('users', 3)
        );
    }

    public function test_admin_can_change_a_users_role(): void
    {
        // Given an admin and a host user
        $admin = User::factory()->create(['role' => 'admin']);
        $host = User::factory()->host()->create();

        // When admin updates the host's role to guest
        $response = $this->actingAs($admin)->patch(route('admin.users.update', $host), [
            'role' => 'guest',
        ]);

        // Then the user's role is updated
        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'id' => $host->id,
            'role' => 'guest',
        ]);
    }

    public function test_host_cannot_access_admin_routes(): void
    {
        // Given a host user
        $host = User::factory()->host()->create();

        // When they try to access /admin/users
        $response = $this->actingAs($host)->get(route('admin.users.index'));

        // Then they get 403 Forbidden
        $response->assertForbidden();
    }

    public function test_unauthenticated_user_cannot_access_admin_routes(): void
    {
        // When an unauthenticated user tries /admin/users
        $response = $this->get(route('admin.users.index'));

        // Then they are redirected to login
        $response->assertRedirect(route('login'));
    }

    public function test_role_must_be_valid(): void
    {
        // Given an admin and a user
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();

        // When admin tries to set an invalid role
        $response = $this->actingAs($admin)->patch(route('admin.users.update', $user), [
            'role' => 'superuser',
        ]);

        // Then validation fails
        $response->assertSessionHasErrors('role');
    }

    public function test_admin_cannot_update_themselves(): void
    {
        // Given an admin
        $admin = User::factory()->create(['role' => 'admin']);

        // When they try to change their own role
        $response = $this->actingAs($admin)->patch(route('admin.users.update', $admin), [
            'role' => 'host',
        ]);

        // Then it fails (prevent locking out all admins)
        $response->assertSessionHasErrors('user');
    }
}
