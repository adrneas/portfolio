export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];
export type Collection = "work" | "travel" | "art" | "notes" | "lab";
export type FunCategory = "travel" | "writing" | "drawings" | "dev";
export type Section = "home" | "work" | "fun" | "about";

export const collections: Collection[] = ["work", "travel", "art", "notes", "lab"];
export const funCategorySlugs: FunCategory[] = [
  "dev",
  "drawings",
  "writing",
  "travel",
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
      fun: "Laboratório",
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
        "Nômade digital há 3 anos",
        "Tento não pisar no pé de ninguém no forró",
        "Penso em sistemas, plantas, arte e código",
        "Desenho enquanto converso (e vice-versa)",
        "Entendo de setups em mesas de cozinha",
      ],
      rotatingPrefix: "Agora:",
      profile: {
        imageAlt: "Retrato de Andreas",
        socialLabel: "Links sociais de Andreas",
        description:
          "Há 31 anos movido a curiosidade por esse mundão. Como Product Designer, foco em decantar a complexidade para entregar interfaces que pareçam óbvias.",
      },
      featuredWork: "Trabalhos em destaque",
      otherRooms: "Trabalho / Laboratório",
      viewAll: "Ver arquivo",
      workPreview: {
        label: "Trabalho",
        title: "Projetos com contexto, sistema e resultado.",
        description:
          "Cases selecionados de UX, desenvolvimento e reestruturação parcial ou integral de produtos digitais.",
        meta: "Cases profissionais",
        cta: "Ver trabalho",
      },
      funPreview: {
        label: "Laboratório",
        title: "Viagens, escrita, desenhos e dev. Olhaí! :)",
        description:
          "Coisas recentes entre viagem, texto, desenho e desenvolvimento de sisteminhas.",
        meta: "itens atuais",
        cta: "Ver laboratório",
      },
      status: [
        ["Foco", "Portfólio editorial"],
        ["Agora", "Home em validação"],
        ["Depois", "Hub Laboratório"],
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
      title: "Laboratório",
      eyebrow: "",
      description:
        "Viagens, textos, desenhos e desenvolvimentos de sisteminhas. Coisas que eu tenho feito recentemente :)",
      empty:
        "Em construção! Organizando fotos e relatos e logo mais tá aqui :)",
      view: "Abrir",
      categories: {
        travel: {
          label: "Viagem",
          title: "Viagem",
          description: "Gente e imagens, percursos e lugares.",
        },
        writing: {
          label: "Escrita",
          title: "Escrita",
          description: "Gosto de escrever também. Aqui têm algumas palavras pra você.",
        },
        drawings: {
          label: "Desenho",
          title: "Desenhos",
          description:
            "Bom demais de brincar de desenhar. Também tenho alguns vídeos de processos de ilustração postados como reels no meu instagram!",
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
        "Sou designer visual e de produto com um background técnico em TI, interessado em transformar sistemas complexos em experiências claras, memoráveis e com uma voz própria.",
      bio:
        "Este espaço serve como documentação da minha atuação profissional e de experimentações diversas. Apresento cases objetivos focados na resolução de problemas sistêmicos e, em paralelo, projetos independentes que exploram lógicas de desenvolvimento, prototipação, pesquisa, e também o lado artístico que não deixo pra lá.",
      practiceTitle: "Prática",
      practice: [
        "Design de Produto (UX/UI), Design Systems e ferramentas internas de gestão.",
        "Desenvolvimento Front-end e prototipação ponta a ponta.",
        "Processos de Research, documentação e embasamento de projetos.",
        "Identidade visual, arquitetura de informação e explorações pessoais.",
        "Intermediação e negociação com parceiros e stakeholders.",
      ],
      contactTitle: "Contato",
    },
  },
  en: {
    localeLabel: "EN",
    switchLabel: "PT",
    nav: {
      work: "Work",
      fun: "Lab",
      about: "About",
    },
    cta: {
      email: "Email",
      whatsapp: "WhatsApp",
      cv: "CV",
    },
    home: {
      title: "Hey, I'm Andreas",
      intro:
        "A portfolio that gives professional work and authored interests the same care: strategy, form, writing, drawing, code, and references.",
      rotatingPhrases: [
        "Digital nomad for 3 years",
        "I try not to step on anyone's feet while dancing forró",
        "I think about systems, plants, art, and code",
        "I draw while talking (and vice versa)",
        "I know my way around kitchen table setups",
      ],
      rotatingPrefix: "Now:",
      profile: {
        imageAlt: "Portrait of Andreas",
        socialLabel: "Andreas social links",
        description:
          "Driven by curiosity about this big world for 31 years. As a Product Designer, I focus on distilling complexity to deliver interfaces that feel obvious.",
      },
      featuredWork: "Featured work",
      otherRooms: "Work / Lab",
      viewAll: "View archive",
      workPreview: {
        label: "Work",
        title: "Projects with context, system, and outcome.",
        description:
          "Selected cases in UX, development, and partial or full restructuring of digital products.",
        meta: "Professional cases",
        cta: "View work",
      },
      funPreview: {
        label: "Lab",
        title: "Travel, writing, drawings, and dev. Take a look :)",
        description:
          "Recent things I've done involving travel, writing, drawing, and systems development.",
        meta: "current items",
        cta: "View lab",
      },
      status: [
        ["Focus", "Editorial portfolio"],
        ["Now", "Home validation"],
        ["Next", "Lab hub"],
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
      title: "Lab",
      eyebrow: "",
      description:
        "Travel, writing, drawing, and developing little systems. Things I've been doing recently :)",
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
          title: "Writing",
          description: "I also enjoy writing. Here are a few words for you.",
        },
        drawings: {
          label: "Drawings",
          title: "Drawings",
          description:
            "I just love to draw, what can I do?! I also have some illustration process videos posted as reels on my Instagram!",
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
        "I am a visual and product designer with a background as an IT technician, interested in turning complex systems into clear, memorable experiences with a voice of their own.",
      bio:
        "This space documents my professional work and a range of experiments. I present objective cases focused on solving systemic problems and, in parallel, independent projects that explore development logic, prototyping, research, and the artistic side I do not leave behind.",
      practiceTitle: "Practice",
      practice: [
        "Product Design (UX/UI), Design Systems, and internal management tools.",
        "Front-end development and end-to-end prototyping.",
        "Research processes, documentation, and project rationale.",
        "Visual identity, information architecture, and personal explorations.",
        "Mediation and negotiation with partners and stakeholders.",
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
