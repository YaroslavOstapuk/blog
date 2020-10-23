<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait UrlSlug
{
    /**
     * @param Model $model
     * @param $coreString
     */
    public function setSlug(Model $model, $coreString)
    {
        $model->slug = get_unique_slug($model, $coreString);
        $model->save();
    }
}
