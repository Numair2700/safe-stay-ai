<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Register minimal test routes protected by role middleware
        Route::get('/test/host-area', fn () => 'host area')
            ->middleware(['auth', 'role:host']);

        Route::get('/test/admin-area', fn () => 'admin area')
            ->middleware(['auth', 'role:admin']);
    }

    // Given a logged-in user with the 'host' role
    // When they access a host-protected route
    // Then they are allowed through (200)
    public function test_host_user_can_access_host_route(): void
    {
        $host = User::factory()->create(['role' => 'host']);

        $response = $this->actingAs($host)->get('/test/host-area');

        $response->assertStatus(200);
    }

    // Given a logged-in user with the 'admin' role
    // When they try to access a host-protected route
    // Then they are blocked (403)
    public function test_admin_user_cannot_access_host_route(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/test/host-area');

        $response->assertStatus(403);
    }

    // Given a logged-in user with the 'admin' role
    // When they access an admin-protected route
    // Then they are allowed through (200)
    public function test_admin_user_can_access_admin_route(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/test/admin-area');

        $response->assertStatus(200);
    }

    // Given a logged-in user with the 'host' role
    // When they try to access an admin-protected route
    // Then they are blocked (403)
    public function test_host_user_cannot_access_admin_route(): void
    {
        $host = User::factory()->create(['role' => 'host']);

        $response = $this->actingAs($host)->get('/test/admin-area');

        $response->assertStatus(403);
    }

    // Given an unauthenticated user
    // When they try to access a host-protected route
    // Then they are redirected to login
    public function test_unauthenticated_user_is_redirected_from_host_route(): void
    {
        $response = $this->get('/test/host-area');

        $response->assertRedirect('/login');
    }
}
