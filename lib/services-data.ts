export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconImage: string;
  pricingNote?: string;
  pricingList?: {
    name: string;
    price: string;
    unit: string;
    tag?: string;
    tagColor?: string;
  }[];
  steps: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: Record<string, ServiceData> = {
  carburant: {
    id: "carburant",
    slug: "carburant",
    title: "Carburant Premium",
    subtitle: "Ne perdez plus votre temps à la station. Carbivio vous livre du carburant premium directement là où vous êtes, <span class='numbers-idgrotesk'>24/7</span> et en moins de <span class='numbers-idgrotesk'>20</span> minutes.",
    heroImage: "/Camion-orange.png",
    iconImage: "/pistolet.png",
    pricingNote: "Les tarifs officiels de Dakar à la pompe.",
    pricingList: [
      {
        name: "Essence (Super)",
        price: "920",
        unit: "FCFA / L",
        tag: "SP",
        tagColor: "bg-green-600 text-white",
      },
      {
        name: "Gasoil (Diesel)",
        price: "680",
        unit: "FCFA / L",
        tag: "D",
        tagColor: "bg-[#eca226] text-black",
      },
    ],
    steps: [
      {
        title: "Commandez via le site",
        description: "Indiquez votre emplacement et le type de carburant dont vous avez besoin.",
      },
      {
        title: "Ouvrez votre trappe",
        description: "Laissez votre trappe à carburant ouverte pour notre technicien.",
      },
      {
        title: "Repartez",
        description: "Votre plein est fait, vous êtes prêt à prendre la route.",
      },
    ],
    faq: [
      {
        question: "Quels types de carburant proposez-vous ?",
        answer: "Nous proposons du Sans Plomb <span class='numbers-idgrotesk'>95</span>, <span class='numbers-idgrotesk'>98</span> et du Diesel de qualité supérieure.",
      },
      {
        question: "Dois-je être présent lors de la livraison ?",
        answer: "Non, tant que votre trappe à carburant est accessible et ouverte, notre technicien peut effectuer le plein sans votre présence.",
      },
      {
        question: "Quel est le délai de livraison ?",
        answer: "Nous garantissons une livraison en moins de <span class='numbers-idgrotesk'>20</span> minutes dans nos zones couvertes.",
      },
    ],
  },
  batterie: {
    id: "batterie",
    slug: "batterie",
    title: "Solutions Batterie",
    subtitle: "Ne laissez pas une panne gâcher votre journée. Nos experts interviennent sur place en seulement <span class='numbers-idgrotesk'>30</span> minutes pour diagnostiquer ou remplacer votre batterie.",
    heroImage: "/Mission.png",
    iconImage: "/batterie.png",
    pricingNote: "Des tarifs clairs, intervention comprise.",
    pricingList: [
      {
        name: "Diagnostic Batterie",
        price: "30 000",
        unit: "FCFA",
      },
      {
        name: "Batterie Standard",
        price: "Dès 75 000",
        unit: "FCFA",
      },
      {
        name: "Batterie Premium",
        price: "Dès 115 000",
        unit: "FCFA",
      },
    ],
    steps: [
      {
        title: "Demandez une intervention",
        description: "Contactez-nous via le site en précisant le modèle de votre véhicule.",
      },
      {
        title: "Le technicien arrive",
        description: "Un expert se rend sur place en moins de <span class='numbers-idgrotesk'>30</span> minutes avec la bonne batterie.",
      },
      {
        title: "Repartez en toute sérénité",
        description: "Votre batterie est remplacée et l'ancienne est recyclée proprement.",
      },
    ],
    faq: [
      {
        question: "Comment savoir si ma batterie est morte ?",
        answer: "Si votre moteur a du mal à démarrer, que les voyants sont faibles ou que vous entendez un clic lors du contact, il est probable que votre batterie soit en cause.",
      },
      {
        question: "Reprenez-vous l'ancienne batterie ?",
        answer: "Oui, nous nous chargeons du recyclage de votre ancienne batterie de manière écologique.",
      },
    ],
  },
  "huile-moteur": {
    id: "huile-moteur",
    slug: "huile-moteur",
    title: "Entretien Moteur",
    subtitle: "Profitez d'une vidange professionnelle et d'un remplacement de filtres réalisés par nos experts, directement à votre domicile ou sur votre lieu de travail.",
    heroImage: "/Collaboration.png",
    iconImage: "/oil.png",
    pricingNote: "Des huiles premium adaptées à chaque moteur.",
    pricingList: [
      {
        name: "Vidange Standard",
        price: "Dès 55 000",
        unit: "FCFA",
      },
      {
        name: "Vidange Premium",
        price: "Dès 75 000",
        unit: "FCFA",
      },
      {
        name: "Vidange Synthétique",
        price: "Dès 95 000",
        unit: "FCFA",
      },
    ],
    steps: [
      {
        title: "Prenez rendez-vous",
        description: "Choisissez l'heure et le lieu exact de l'intervention.",
      },
      {
        title: "Intervention experte",
        description: "Notre mécanicien effectue la vidange et change les filtres nécessaires.",
      },
      {
        title: "Moteur comme neuf",
        description: "Votre véhicule est prêt pour des milliers de kilomètres supplémentaires.",
      },
    ],
    faq: [
      {
        question: "Combien de temps prend une vidange ?",
        answer: "L'intervention complète prend généralement entre <span class='numbers-idgrotesk'>30</span> et <span class='numbers-idgrotesk'>45</span> minutes.",
      },
      {
        question: "Remplacez-vous également le filtre à huile ?",
        answer: "Oui, le remplacement du filtre à huile est inclus systématiquement dans toutes nos prestations de vidange.",
      },
    ],
  },
  pneus: {
    id: "pneus",
    slug: "pneus",
    title: "Service Pneus",
    subtitle: "Une crevaison ou des pneus usés ? Notre atelier mobile vient à vous pour réparer ou remplacer vos pneumatiques sur place. Reprenez la route en toute sécurité.",
    heroImage: "/Innovation.png",
    iconImage: "/5 copie.png",
    pricingNote: "Réparation et montage sur le lieu de votre choix.",
    pricingList: [
      {
        name: "Réparation Crevaison",
        price: "15 000",
        unit: "FCFA",
      },
      {
        name: "Pneu Standard",
        price: "Dès 55 000",
        unit: "FCFA / pneu",
      },
      {
        name: "Pneu Premium",
        price: "Dès 95 000",
        unit: "FCFA / pneu",
      },
    ],
    steps: [
      {
        title: "Indiquez votre dimension",
        description: "Fournissez la taille de vos pneus lors de la demande d'intervention.",
      },
      {
        title: "Atelier mobile",
        description: "Notre fourgon équipé arrive sur place pour effectuer le montage.",
      },
      {
        title: "Reprenez la route",
        description: "Roulez en toute sécurité avec vos pneus neufs ou réparés.",
      },
    ],
    faq: [
      {
        question: "Pouvez-vous réparer une crevaison ?",
        answer: "Oui, si la crevaison est située sur la bande de roulement et respecte les normes de sécurité, nous pouvons la réparer sur place.",
      },
      {
        question: "Vendez-vous des pneus hiver ?",
        answer: "Oui, nous proposons une gamme complète de pneus été, hiver et <span class='numbers-idgrotesk'>4</span> saisons.",
      },
    ],
  },
  urgence: {
    id: "urgence",
    slug: "urgence",
    title: "Assistance 24/7",
    subtitle: "Une panne ne prévient jamais. Notre équipe de secours est disponible <span class='numbers-idgrotesk'>24/7</span> pour un dépannage express et vous sortir de l'impasse.",
    heroImage: "/Succes.png",
    iconImage: "/alert.png",
    pricingNote: "Disponibilité 24/7 pour toute situation.",
    pricingList: [
      {
        name: "Déplacement Rapide",
        price: "25 000",
        unit: "FCFA",
      },
      {
        name: "Dépannage Mineur",
        price: "45 000",
        unit: "FCFA",
      },
      {
        name: "Erreur Carburant",
        price: "85 000",
        unit: "FCFA",
      },
    ],
    steps: [
      {
        title: "Appelez-nous",
        description: "Contactez notre ligne d'urgence ouverte <span class='numbers-idgrotesk'>24/7</span>.",
      },
      {
        title: "Diagnostic rapide",
        description: "Nous évaluons le problème par téléphone et envoyons l'expert adéquat.",
      },
      {
        title: "Résolution sur place",
        description: "Dans la majorité des cas, le problème est résolu sans besoin de remorquage.",
      },
    ],
    faq: [
      {
        question: "Quels sont vos délais d'intervention en urgence ?",
        answer: "Nous visons une arrivée sur site en moins de <span class='numbers-idgrotesk'>30</span> minutes, selon la circulation et votre emplacement exact.",
      },
      {
        question: "Faites-vous du remorquage ?",
        answer: "Si le problème ne peut être résolu sur place de manière sécurisée, nous pouvons organiser le remorquage vers un garage partenaire.",
      },
    ],
  },
};
