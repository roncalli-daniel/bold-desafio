<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    /***
     * Check, from a tid, if exist a register in database.
     *
     * @param $tid
     * @return bool
     */
    static function exist($tid)
    {
        if(Tweet::where('tid', $tid)->first() !== null)
            return true;

        return false;
    }
}
