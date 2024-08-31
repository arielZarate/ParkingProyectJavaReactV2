package com.parking.backend.Enum;

public enum PROVINCE {
    UNKNOWN("Desconocido"),
    BUENOS_AIRES("Buenos Aires"),
    CATAMARCA("Catamarca"),
    CHACO("Chaco"),
    CHUBUT("Chubut"),
    CABA("Ciudad Autónoma de Buenos Aires"),
    CORDOBA("Cordoba"),
    CORRIENTES("Corrientes"),
    ENTRE_RIOS("Entre Ríos"),
    FORMOSA("Formosa"),
    JUJUY("Jujuy"),
    LA_RIOJA("La Rioja"),
    LA_PAMPA("La Pampa"),
    MENDOZA("Mendoza"),
    MISIONES("Misiones"),
    NEUQUEN("Neuquén"),
    RIO_NEGRO("Río Negro"),
    SALTA("Salta"),
    SAN_JUAN("San Juan"),
    SAN_LUIS("San Luis"),
    SANTA_FE("Santa Fe"),
    SANTA_CRUZ("Santa Cruz"),
    TIERRA_DEL_FUEGO("Tierra del Fuego"),
    TUCUMAN("Tucumán");

    private final String displayName;

    PROVINCE(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }



    /*
    * ======FORMA DE USO==================
     Province province = Province.BUENOS_AIRES;

        // Imprimir el nombre de visualización de la provincia
        System.out.println("La provincia es: " + province.getDisplayName());

        // Iterar sobre todas las provincias
        for (Province p : Province.values()) {
            System.out.println("Provincia: " + p.getDisplayName());
        }
    * */

}
