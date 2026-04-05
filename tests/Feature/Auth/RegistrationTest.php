<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('host.properties.index', absolute: false));
    }

    // Given a user submits the registration form
    // When the account is created
    // Then the user is assigned the 'host' role by default
    public function test_registered_user_is_assigned_host_role(): void
    {
        $this->post('/register', [
            'name' => 'Host User',
            'email' => 'host@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'host@example.com',
            'role' => 'host',
        ]);
    }
}
