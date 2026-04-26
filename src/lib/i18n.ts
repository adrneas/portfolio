export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];
export type Collection = "work" | "travel" | "art" | "notes" | "lab";
export type FunCategory = "travel" | "writing" | "drawings" | "dev";
export type Section = "home" | "work" | "fun" | "about";

export const collections: Collection[] = ["work", "travel", "art", "notes", "lab"];
export const funCategorySlugs: FunCategory[] = [
  "travel",
  "writing",
  "drawings",
  "dev",
];

export const funCategoryCollections: Record<FunCategory, Collection> = {
  travel: "travel",
  writing: "notes",
  drawings: "art",
  dev: "lab",
};

export const collectionFunCategories: Partial<Record<Collection, FunCategory>> = {
  travel: "travel",
  notes: "writing",
  art: "drawings",
  lab: "dev",
};

export const dictionaries = {
  pt: {
    localeLabel: "PT",
    switchLabel: "EN",
    nav: {
      work: "Trabalho",
      fun: "Brincadeiras",
      about: "Sobre",
    },
    cta: {
      email: "Email",
      whatsapp: "WhatsApp",
      cv: "CV",
    },
    home: {
      title: "Opa, eu sou o Andreas",
      intro:
        "Um portfólio que organiza trabalho profissional e interesses autorais com a mesma atenção: estratégia, forma, texto, desenho, código e repertório.",
      rotatingPhrases: [
        "nômade digital há 3 anos",
        "desenho enquanto converso e vice versa",
        "aprendendo a dançar forró",
        "me divirto criando e estudando",
        "valorizo curiosidade e empatia",
      ],
      rotatingPrefix: "Agora:",
      profile: {
        imageAlt: "Retrato de Andreas",
        socialLabel: "Links sociais de Andreas",
        description:
          "Há 31 anos curioso por viver e criar esse mundão do jeito que for. Como product designer, gosto da imersão em projetos complexos com desafios de simplificação e aperfeiçoamento.",
      },
      featuredWork: "Trabalhos em destaque",
      otherRooms: "Trabalho / Brincadeiras",
      viewAll: "Ver arquivo",
      workPreview: {
        label: "Trabalho",
        title: "Projetos com contexto, sistema e resultado.",
        description:
          "Cases selecionados de identidade, produto e narrativa visual, organizados para leitura rápida sem perder densidade.",
        meta: "Cases profissionais",
        cta: "Ver trabalho",
      },
      funPreview: {
        label: "Brincadeiras",
        title: "Viagem, escrita, desenhos e dev no mesmo arquivo.",
        description:
          "Coisas recentes entre viagem, texto, desenho e desenvolvimento de sisteminhas.",
        meta: "itens atuais",
        cta: "Ver brincadeiras",
      },
      status: [
        ["Foco", "Portfólio editorial"],
        ["Agora", "Home em validação"],
        ["Depois", "Hub Fun"],
      ],
      signals: [
        "Identidade e sistemas visuais",
        "Interfaces para times e produtos digitais",
        "Arte, texto, código e repertório de viagem",
      ],
    },
    collection: {
      work: {
        title: "Trabalho",
        description:
          "Cases curtos de design, com contexto, papel, escolhas de sistema e resultado.",
      },
      travel: {
        title: "Travel",
        description:
          "Diários visuais de viagens, lugares e repertórios que alimentam o olhar.",
      },
      art: {
        title: "Art",
        description:
          "Desenhos, séries visuais e estudos que funcionam como pesquisa pessoal.",
      },
      notes: {
        title: "Notes",
        description:
          "Textos breves sobre design, repertório, processo e cultura visual.",
      },
      lab: {
        title: "Lab",
        description:
          "Passion projects, protótipos e ferramentas pequenas que ainda estão em movimento.",
      },
    },
    fun: {
      title: "Brincadeiras",
      eyebrow: "",
      description:
        "Viagens, textos, desenhos e desenvolvimentos de sisteminhas. Coisas que eu tenho feito recentemente :)",
      empty:
        "Ainda não há itens publicados nesta categoria. A estrutura está pronta para receber novos diários e experimentos.",
      view: "Abrir",
      categories: {
        travel: {
          label: "Viagem",
          title: "Viagem",
          description: "Lugares, percursos e imagens que viram repertório.",
        },
        writing: {
          label: "Escrita",
          title: "Escrita",
          description: "Ensaios breves sobre design, processo e cultura visual.",
        },
        drawings: {
          label: "Desenhos",
          title: "Desenhos",
          description:
            "Bom demais de brincar de desenhar. dá uma olhada no que eu fiz aqui. Também tenho alguns vídeos de processos de ilustração postados como reels no meu instagram!",
        },
        dev: {
          label: "Dev",
          title: "Experimentos",
          description: "Protótipos, ferramentas pequenas e testes de código.",
        },
      },
    },
    filters: {
      all: "Tudo",
      label: "Filtrar por tag",
    },
    detail: {
      back: "Voltar",
      externalProject: "Abrir projeto",
      role: "Papel",
      discipline: "Disciplina",
      client: "Cliente",
      collaborators: "Colaboradores",
      outcome: "Resultado",
    },
    about: {
      title: "Sobre",
      intro:
        "Sou designer visual e de produto, interessado em transformar sistemas complexos em experiências claras, memoráveis e com uma voz própria.",
      bio:
        "Este site foi pensado como portfólio profissional e arquivo autoral. A ideia é mostrar cases de design com objetividade, mas também deixar visível o que alimenta o trabalho: desenho, texto, pesquisa visual e projetos feitos por interesse genuíno.",
      practiceTitle: "Prática",
      practice: [
        "Identidade visual, linguagem de marca e direção de arte.",
        "Interfaces, sistemas de design e ferramentas para equipes.",
        "Narrativas editoriais, arquivos visuais e protótipos pessoais.",
      ],
      contactTitle: "Contato",
    },
  },
  en: {
    localeLabel: "EN",
    switchLabel: "PT",
    nav: {
      work: "Work",
      fun: "Fun",
      about: "About",
    },
    cta: {
      email: "Email",
      whatsapp: "WhatsApp",
      cv: "CV",
    },
    home: {
      title: "Opa, eu sou o Andreas",
      intro:
        "A portfolio that gives professional work and authored interests the same care: strategy, form, writing, drawing, code, and references.",
      rotatingPhrases: [
        "digital nomad for 3 years",
        "I draw while I talk and vice versa",
        "learning to dance forró",
        "having fun creating and studying",
        "I value curiosity and empathy",
      ],
      rotatingPrefix: "Now:",
      profile: {
        imageAlt: "Portrait of Andreas",
        socialLabel: "Andreas social links",
        description:
          "Curious for 31 years about living and creating in this big world however possible. As a product designer, I enjoy immersing myself in complex projects with challenges of simplification and refinement.",
      },
      featuredWork: "Featured work",
      otherRooms: "Work / Fun",
      viewAll: "View archive",
      workPreview: {
        label: "Work",
        title: "Projects with context, system, and outcome.",
        description:
          "Selected identity, product, and visual narrative cases, structured for fast reading without losing depth.",
        meta: "Professional cases",
        cta: "View work",
      },
      funPreview: {
        label: "Fun",
        title: "Travel, writing, drawings, and dev in one archive.",
        description:
          "The authored side will gather visual diaries, essays, drawings, and code experiments after the home is validated.",
        meta: "current items",
        cta: "View fun",
      },
      status: [
        ["Focus", "Editorial portfolio"],
        ["Now", "Home validation"],
        ["Next", "Fun hub"],
      ],
      signals: [
        "Identity and visual systems",
        "Interfaces for teams and digital products",
        "Art, writing, code, and travel references",
      ],
    },
    collection: {
      work: {
        title: "Work",
        description:
          "Short design cases with context, role, system choices, and outcome.",
      },
      travel: {
        title: "Travel",
        description:
          "Visual travel diaries, places, and references that feed the work.",
      },
      art: {
        title: "Art",
        description:
          "Drawings, visual series, and studies that operate as personal research.",
      },
      notes: {
        title: "Notes",
        description:
          "Short essays on design, references, process, and visual culture.",
      },
      lab: {
        title: "Lab",
        description:
          "Passion projects, prototypes, and small tools that are still in motion.",
      },
    },
    fun: {
      title: "Fun",
      eyebrow: "Authored archive",
      description:
        "Travel, writing, drawings, and dev gathered as extensions of the process: references, text, drawing, and experiments.",
      empty:
        "There are no published items in this category yet. The structure is ready for future diaries and experiments.",
      view: "Open",
      categories: {
        travel: {
          label: "Travel",
          title: "Visual diaries",
          description: "Places, routes, and images that become references.",
        },
        writing: {
          label: "Writing",
          title: "Essays and notes",
          description: "Short essays on design, process, and visual culture.",
        },
        drawings: {
          label: "Drawings",
          title: "Drawings",
          description: "Studies, visual series, and observations in line.",
        },
        dev: {
          label: "Dev",
          title: "Experiments",
          description: "Prototypes, small tools, and code sketches.",
        },
      },
    },
    filters: {
      all: "All",
      label: "Filter by tag",
    },
    detail: {
      back: "Back",
      externalProject: "Open project",
      role: "Role",
      discipline: "Discipline",
      client: "Client",
      collaborators: "Collaborators",
      outcome: "Outcome",
    },
    about: {
      title: "About",
      intro:
        "I am a visual and product designer interested in turning complex systems into clear, memorable experiences with a point of view.",
      bio:
        "This site is both a professional portfolio and an authored archive. It presents design cases with focus, while keeping visible the things that feed the work: drawing, writing, visual research, and curiosity-led projects.",
      practiceTitle: "Practice",
      practice: [
        "Visual identity, brand language, and art direction.",
        "Interfaces, design systems, and tools for teams.",
        "Editorial narratives, visual archives, and personal prototypes.",
      ],
      contactTitle: "Contact",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}

export function localizedRoute(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === "pt") {
    return normalized === "/en" ? "/" : normalized;
  }

  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export function collectionPath(locale: Locale, collection: Collection) {
  return localizedRoute(locale, `/${collection}`);
}

export function funPath(locale: Locale) {
  return localizedRoute(locale, "/fun");
}

export function funCategoryPath(locale: Locale, category: FunCategory) {
  return `${funPath(locale)}?category=${category}`;
}

export function funEntryPath(
  locale: Locale,
  category: FunCategory,
  slug: string,
) {
  return `${funPath(locale)}/${category}/${slug}`;
}

export function getFunCategoryFromCollection(collection: Collection) {
  return collectionFunCategories[collection];
}

export function getCollectionFromFunCategory(category: FunCategory) {
  return funCategoryCollections[category];
}

export function isFunCategory(value: string): value is FunCategory {
  return funCategorySlugs.includes(value as FunCategory);
}
