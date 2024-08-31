package com.parking.backend.Enum;

public enum COLOR {

        UNKNOW("Desconocido"),
        RED("Rojo"),
        BLUE("Azul"),
        GREEN("Verde"),
        BLACK("Negro"),
        WHITE("Blanco"),
        GRAY("Gris"),
        YELLOW("Amarillo"),
        ORANGE("Naranja"),
        PURPLE("Púrpura"),
        PINK("Rosa"),
        BROWN("Marrón"),
        SILVER("Plata"),
        GOLD("Oro"),
        BEIGE("Beige"),
        CYAN("Cian"),
        MAGENTA("Magenta"),
        TEAL("Turquesa"),
        MAROON("Granate"),
        NAVY("Azul marino"),
        OLIVE("Oliva"),
        LIME("Lima");
     

        private final String description;

        COLOR(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }


}
