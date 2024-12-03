const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Flujo para los requisitos de inscripción detallados
const flowAlfabetizacion = addKeyword(['5']).addAnswer([
    '📄 *Alfabetización*:',
    '',
    '✅ Copia de INE',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Tener 15 años o más',
    '',
    '*Si eres menor de edad*',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Copia del INE del tutor',
    '✅ Copia de CURP',
    '',
],{ delay: 2000 }).addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'],{ delay: 5000 })

const flowPrimaria = addKeyword(['6']).addAnswer([
    '📄 *Primaria*:',
    '',
    '✅ Copia de INE',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Tener 15 años o más',
    '',
    '*Si eres menor de edad*',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Copia del INE del tutor',
    '✅ Copia de CURP',
    '',
    'Nota: si estuviste estudiando en algun grado de nivel primaria y tienes boletas de calificación aprovadas, puedes presentarlas para hacer una valoración de tu nivel escolar',

],{ delay: 2000 }).addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'],{ delay: 5000 })

const flowSecundaria = addKeyword(['7']).addAnswer([
    '📄 *Secundaria*:',
    '',
    '✅ Copia de INE',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Tener 15 años o más',
    '✅ Copia del certificado de educación primaria',
    '',
    '*Si eres menor de edad*',
    '✅ Copia de acta de nacimiento',
    '✅ Copia de CURP',
    '✅ Foto tamaño infantil',
    '✅ Copia del INE del tutor',
    '✅ Copia de CURP',
    '✅ Copia del certificado de educación primaria',
    '',
    'Nota: si estuviste estudiando en algún grado de nivel secundaria y tienes boletas de calificación aprobadas, puedes presentarlas para hacer una valoración de tu nivel escolar',
],{ delay: 2000 }).addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'],{ delay: 5000 })

// Flujo de selección de nivel en requisitos de inscripción
const flowRequisitos = addKeyword(['2']).addAnswer([
    '📄 *Información sobre Requisitos de Inscripción*',
    '',
    'Escribe el número de la opción que deseas consultar:',
    '',
    '👉 *5* Alfabetización',
    '👉 *6* Primaria',
    '👉 *7* Secundaria',
], null, null, [flowAlfabetizacion, flowPrimaria, flowSecundaria], { delay: 2000 })

// Flujo sobre la duración de los programas
const flowDuracion = addKeyword(['1']).addAnswer([
    '⏳ *Información sobre la duración de los programas*',
    '',
    'El tiempo de duración de los programas es el siguiente:',
    '',
    '*Educación alfabetización:* Se puede completar en aproximadamente 1 a 6 meses.',
    '*Educación primaria:* Se puede completar en aproximadamente 3 a 4 meses.',
    '*Educación secundaria:* Se completa en aproximadamente 3 a 4 meses.',
    '',
    'Además, si ya tienes conocimientos previos de saberes, puedes presentar un examen diagnostico de conocimiento primaria o secundaria, en donde si lo concluyes y acreditas pasarás automáticamente al siguiente nivel educativo.',
],{ delay: 2000 }).addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'],{ delay: 5000 })

// Flujo sobre la ubicación del IEAT
const flowUbicacion = addKeyword(['3']).addAnswer([
    '📍 *Información sobre la ubicación del IEAT*',
    '',
    'Nos encontramos en la siguiente dirección: *86930, Melchor Ocampo 601, Centro, Balancán, Tab, Frente al Kiosco del parque central, edificio de dos plantas color amarillo.*',
    '',
    'GoogleMaps: https://maps.app.goo.gl/SRJn5ZdsfssQttZp8',
],{ delay: 2000 }
).addAnswer(['*Foto de referencia*',],{media: 'https://i.imgur.com/VPmyEW9.jpeg'}
) .addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'], { delay: 6000 })

// Flujo para contactar a una persona real
const flowContacto = addKeyword(['4']).addAnswer([
    '📞 *Contactar una persona real*',
    '',
    '¡Claro! Si necesitas más información, puedes llamar a este numero 9342459162 y atenderemos tu llamada, Estaremos encantados de atenderte.',
],{ delay: 2000 }).addAnswer(['Si quieres finalizar el chat escribe "*Gracias*" y si quieres volver a empezar escribe "*Hola*"'],
    { delay: 2000 }
)

// Flujo de despedida
const flowDespedida = addKeyword(['gracias']).addAnswer([
    '🙏 "Gracias por contactarte con el Instituto de Educación para Adultos. Si tienes alguna otra duda, no dudes en regresar. ¡Te esperamos para iniciar tu aprendizaje!"',
],{ delay: 2000 })

// Flujo principal (bienvenida y opciones)
const flowPrincipal = addKeyword(['buenos dias', 'hola', 'ole', 'alo','ola','buenos días','buenos diaz','vuenos diaz',]).addAnswer(
    '🙌 ¡Hola! Bienvenido/a al *Instituto de Educación para Adultos de Tabasco*. Soy un Bot y estoy aquí para ayudarte con la información sobre los programas de educación *Alfabetización, Primaria y Secundaria* . ¿En qué puedo asistirte hoy?',
    { delay: 2000 }
).addAnswer(
    [
        'Escribe el número de la opción que deseas consultar:',
        '',
        '👉 *1* Información sobre la duración de los programas',
        '👉 *2* Información sobre Requisitos de Inscripción',
        '👉 *3* Información sobre la ubicación del IEAT',
        '👉 *4* Contactar una persona real',
    ],
    null,
    null,
    [flowRequisitos, flowDuracion, flowUbicacion, flowContacto],
    { delay: 2000 }
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowDespedida])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
