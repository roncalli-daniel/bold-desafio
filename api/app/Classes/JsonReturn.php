<?php

namespace App\Classes;

class JsonReturn {
    /*
    |--------------------------------------------------------------------------
    | Json Return
    |--------------------------------------------------------------------------
    |
    | Class to provide a custom return JSON in api calls
    |
    */

    public $status = false;
    public $data = null;
    public $message = null;
    public $error = null;

    public function __construct($_status, $_data = null, $_message = null, $_error = null)
    {
        $this->set($_status, $_data, $_message, $_error);
    }

    public function set($_status, $_data, $_message, $_error)
    {
        $this->status = $_status;
        $this->data = $_data;
        $this->message = $_message;
        $this->error = $_error;
    }

    public function __toString() {
        return json_encode($this);
    }
}