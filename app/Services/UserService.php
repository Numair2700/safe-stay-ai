<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function getAllUsers(): Collection
    {
        return User::orderByDesc('created_at')->get();
    }

    public function updateRole(User $user, string $role): void
    {
        $oldRole = $user->role;
        $user->update(['role' => $role]);

        Log::info('Admin action: user role changed', [
            'admin_id' => auth()->id(),
            'target_user_id' => $user->id,
            'target_user_email' => $user->email,
            'old_role' => $oldRole,
            'new_role' => $role,
        ]);
    }
}
