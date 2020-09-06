# Banco de Alimentos

## Objetivo

Este trabajo tiene como objetivo diseñar una solución de información para el Banco Alimentario de La Plata. El foco será el traslado de donaciones y envíos a beneficiarios. El sistema incorpora algunas ideas de aplicaciones como Glovo o Uber para distribuir y optimizar la
logística de traslado de envíos.

Se utilizará Angular para el frontend y Loopback en backend con MongoDB como base.


## Requisitos

* node v12.14 o mayor

## Instalación

Clonar el repositorio
```
git clone https://github.com/emanuelbas/Banco-de-Alimentos
```
Instalar las dependencias, tanto para el frontend como el backend
```
npm i
```

## Uso

Para iniciar la aplicación en desarrollo deberá realizar los siguientes pasos:
1. Levantar la API, posicionandose en la carpeta backend
```
node .
```
2. Levantar la aplicación posicionándose en la carpeta frontend
```
ng serve
```
3. Navegar a http://localhost:4200/

## Lista de funcionalidades desarrolladas

⭐ Manejo de cuentas para voluntarios, donantes, beneficiarios y administradores
⭐ Creación y visualización de donaciones con descripcion general o detallada
⭐ Creación y visualización de envios para beneficiarios a partir de una donación o de stock
⭐ Manejo de traslados incluyendo busqueda y asignación de voluntarios y seguimiento de los mismos
⭐ Gamificación de la app con sistema de puntos e insignias para donantes y voluntarios
⭐ Envío de correos de notificación
⭐ Gestión de stock de productos
⭐ Manejo de archivos



## Ejemplos de funcionalidades

### Registrar una donación para el banco

![](https://raw.githubusercontent.com/emanuelbas/Banco-de-Alimentos/master/documentacion/Gifs%20de%20exhibicion/RegistrarGeneral.gif)

### Notificar a voluntarios sobre un nuevo traslado

![](https://raw.githubusercontent.com/emanuelbas/Banco-de-Alimentos/master/documentacion/Gifs%20de%20exhibicion/NotificarVoluntarios.gif)

### Realizar traslado y obtener puntos e insignias

![](https://raw.githubusercontent.com/emanuelbas/Banco-de-Alimentos/master/documentacion/Gifs%20de%20exhibicion/EfectuarTraslado.gif)

### Registrar un envio desde el banco a una organización beneficiaria

![](https://raw.githubusercontent.com/emanuelbas/Banco-de-Alimentos/master/documentacion/Gifs%20de%20exhibicion/NuevoEnvioParaBeneficiario.gif)