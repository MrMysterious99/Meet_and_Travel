<?php
//klasa za povezivanje sa bazom podataka
class DB {
    private static $instanca = NULL;

    private function __construct() {}

    private function __clone() {}

    public static function getInstance() {
      if (!isset(self::$instanca)) {
        $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
        
        //povezujemo se preko PDO
        //PDO je klasa ugradjena u PHP
        //PDO prikazuje konekciju izmedju PHP i DB servera
        self::$instanca = new PDO('mysql:host=localhost:3307;dbname=meetandtravel', 'root', '', $pdo_options);
      }
      return self::$instanca;
    }
  }
?>