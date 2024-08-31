package com.parking.backend.Exceptions;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@ControllerAdvice
public class GlobalExceptionsHandler {

    /*
    * Java Util Logging es una opción incorporada en Java, útil si no deseas usar SLF4J.
System.err.println y e.printStackTrace() son formas básicas que funcionan, pero carecen
* de la flexibilidad de un sistema de logging completo.
    *
    * */

    private static final Logger logger = Logger.getLogger(GlobalExceptionsHandler.class.getName());

    @ExceptionHandler(CustomException.class)
    @ResponseBody
    public ResponseEntity<String> handleExceptionMessage(CustomException e) {
       // logger.log(Level.SEVERE, "Error: " + e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }





    @ExceptionHandler(InvalidFormatException.class)
    @ResponseBody
    public ResponseEntity<String> handleInvalidFormatException(InvalidFormatException e) {
        String path = e.getPath().toString();
        String message = String.format("Valor no válido '%s' para el campo '%s'.", e.getValue(), path);
        logger.log(Level.SEVERE, "InvalidFormatException: " + message, e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }




    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<String> handleException(Exception e) {
       // e.printStackTrace();
       // logger.log(Level.SEVERE, "Error: " + e.getMessage(), e);
        //System.out.println("Error:" + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage() );

    }




}
