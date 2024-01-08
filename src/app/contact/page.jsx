/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "Contactez-nous",
  description: "...",
};
export default function Contact() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl m-3">
          Contactez-nous
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 mb-1">
          Vous avez des questions relatives à la pépinière ou à nos végétaux ?
          Nous sommes là pour vous aider ! N'hésitez pas à nous contacter, et
          nous ferons notre possible pour vous répondre dans les plus brefs
          délais.
        </p>
        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Coordonnées de contact :
        </h2>
        <ul className="text-lg text-gray-600">
          <li>
            Téléphone : <a href="tel:0619100412">06 19 10 04 12</a>
          </li>
          <li>
            E-mail :{" "}
            <a href="mailto:pepiniereppd@gmail.com">pepiniereppd@gmail.com</a>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-bold text-gray-900">Adresse :</h2>
        <address className="text-lg text-gray-600">
          Pepinière PPD
          <br />
          SAINT-ANDRE 66690
        </address>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Réseaux sociaux :
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Suivez-nous sur
          <a
            href="https://www.facebook.com/PoussezPasDerriere/"
            className="text-blue-500 hover:underline"
          >
            Pepinière PPD
          </a>{" "}
          pour rester informé(e) de nos dernières actualités et offres
          spéciales.
        </p>

        <p className="mt-6 text-lg text-gray-600">
          N'hésitez pas à nous contacter pour toute demande ou renseignement.
          Nous sommes ravis de vous assister dans vos projets de jardinage et
          d'aménagement extérieur.
        </p>
      </div>
    </div>
  );
}
