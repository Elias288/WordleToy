# Wordle Game

## Reglas

Las reglas de Wordle son elegantemente sencillas. Tu objetivo es adivinar una palabra secreta de cinco letras en el menor número de intentos posible. Para enviar una respuesta, escriba cualquier palabra de cinco letras y pulse Intro. Todas tus adivinanzas deben ser palabras reales, de acuerdo con un diccionario de palabras de cinco letras que Wordle permite como adivinanzas.<br>
Al acertar una letra de la palabra en la posición correcta está se marcará de color verde y al adivinar una letra pero fuera de su posición se marcará amarilla.

## Generar Backend Pod

```sh
# BUILD BACKEND CONTAINER IMAGE
podman build -t fedoradevnestjsimg .

# RENAME devEnvironment.yaml.example AND EXEC:
podman play kube devEnvironment.yaml
```
