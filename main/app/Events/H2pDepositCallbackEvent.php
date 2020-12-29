<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class H2pDepositCallbackEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $user;
    public function __construct(User $user)
    {
        //

        $this->user = $user;
    }

    public function broadcastOn()
    {

        //创建一个私有频道
        return new PrivateChannel('user.' . $this->user->id);
    }

    //这个方法是 要传递的数据
    public function broadcastWith()
    {
        return ['depositeStatus' => 1];
    }
}
