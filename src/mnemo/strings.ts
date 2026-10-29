/*
 * What the cartridge layer says, in the three languages the host speaks first. The site
 * itself stays in English: these are only the words Mnemosyne adds.
 */

const EN = {
  orb: "the orb",
  voiceTitle: "Hands-free with {name}",
  voiceAsk: "Say to {name}: « open Bygga and go to the next step ». It works for the previous step too.",
  voiceRead: "The steps are read aloud in English.",
  readAloud: "Read it aloud",
  talkTo: "Talk to {name}",
  orbFailed: "{name} is not answering",
  outsideTitle: "Outside Mnemosyne",
  outsideBody: "This part of Bygga runs on Together AI. In Mnemosyne, Bygga shows the guides and reads them aloud.",
  close: "Close",
  step: "Step {n} of {of}",
  built: "That was the last step: {product} is built",
  parts: "Back to the parts",
  opened: "Here is {product}",
  openedAt: "Here is {product}, step {n} of {of}",
  notOnSteps: "Bygga is not on the steps yet: press Start building, or ask for step 1.",
  finished: "The build is finished.",
  noGuide: "No guide is open in Bygga.",
  notMoved: "The step did not change: something is open over the guide in Bygga.",
  noProduct: "Bygga has no guide for « {q} ».",
  closeNames: " Close names: {names}.",
};

type Strings = typeof EN;

const FR: Strings = {
  orb: "l'orbe",
  voiceTitle: "Les mains libres avec {name}",
  voiceAsk: "Dis à {name} : « ouvre Bygga et passe à l'étape suivante ». Ça marche aussi pour revenir à l'étape précédente.",
  voiceRead: "Les étapes sont lues à voix haute, en anglais.",
  readAloud: "Lire à voix haute",
  talkTo: "Parler à {name}",
  orbFailed: "{name} ne répond pas",
  outsideTitle: "En dehors de Mnemosyne",
  outsideBody: "Cette partie de Bygga passe par Together AI. Dans Mnemosyne, Bygga montre les guides et les lit à voix haute.",
  close: "Fermer",
  step: "Étape {n} sur {of}",
  built: "C'était la dernière étape : {product} est monté",
  parts: "Retour aux pièces",
  opened: "Voici {product}",
  openedAt: "Voici {product}, étape {n} sur {of}",
  notOnSteps: "Bygga n'est pas encore sur les étapes : appuie sur Start building, ou demande l'étape 1.",
  finished: "Le montage est terminé.",
  noGuide: "Aucun guide n'est ouvert dans Bygga.",
  notMoved: "L'étape n'a pas changé : quelque chose est ouvert par-dessus le guide dans Bygga.",
  noProduct: "Bygga n'a pas de guide pour « {q} ».",
  closeNames: " Noms proches : {names}.",
};

const ES: Strings = {
  orb: "el orbe",
  voiceTitle: "Manos libres con {name}",
  voiceAsk: "Di a {name}: « abre Bygga y pasa al paso siguiente ». También sirve para volver al paso anterior.",
  voiceRead: "Los pasos se leen en voz alta, en inglés.",
  readAloud: "Leer en voz alta",
  talkTo: "Hablar con {name}",
  orbFailed: "{name} no responde",
  outsideTitle: "Fuera de Mnemosyne",
  outsideBody: "Esta parte de Bygga funciona con Together AI. En Mnemosyne, Bygga muestra las guías y las lee en voz alta.",
  close: "Cerrar",
  step: "Paso {n} de {of}",
  built: "Era el último paso: {product} está montado",
  parts: "Volvemos a las piezas",
  opened: "Aquí está {product}",
  openedAt: "Aquí está {product}, paso {n} de {of}",
  notOnSteps: "Bygga aún no está en los pasos: pulsa Start building, o pide el paso 1.",
  finished: "El montaje está terminado.",
  noGuide: "No hay ninguna guía abierta en Bygga.",
  notMoved: "El paso no cambió: hay algo abierto sobre la guía en Bygga.",
  noProduct: "Bygga no tiene guía para « {q} ».",
  closeNames: " Nombres parecidos: {names}.",
};

const TABLES: Record<string, Strings> = { en: EN, fr: FR, es: ES };

/** The strings for a host language ("fr-FR" reads as fr), English when the host speaks another. */
export function strings(lang: string): Strings {
  return TABLES[lang.toLowerCase().slice(0, 2)] ?? EN;
}

/** Fills {name}-style holes; a hole with no value stays as written, never an empty gap. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (hole, key: string) => (key in values ? String(values[key]) : hole));
}
