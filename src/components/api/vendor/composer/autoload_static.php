<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb3a127b5a2351299ed5089356bd1d5e3
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb3a127b5a2351299ed5089356bd1d5e3::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb3a127b5a2351299ed5089356bd1d5e3::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb3a127b5a2351299ed5089356bd1d5e3::$classMap;

        }, null, ClassLoader::class);
    }
}
