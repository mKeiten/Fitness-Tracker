package com.fitnesstracker.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}

// Für Daten der Wiegung siehe OpenScale - Evtl. unter: https://github.com/oliexdev/openScale/blob/3269bd4aa115871974a2961b492bd015c20b6e32/android_app/app/src/main/java/com/health/openscale/core/bluetooth/BluetoothYunmaiSE_Mini.java