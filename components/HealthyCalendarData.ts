
// Shared calendar data for web and native
export enum EventType {
  Meal = 'meal',
  Sport = 'sport'
}
export enum MealType {
  Breakfast = 'breakfast',
  Snack = 'snack',
  Lunch = 'lunch',
  Afternoon = 'afternoon',
  Dinner = 'dinner',
  PreWorkout = 'preWorkout',
  IntraWorkout = 'intraWorkout',
  PostWorkout = 'postWorkout',
}
export enum SportType {
  Bike = 'bike',
  Strength = 'strength',
  Functional = 'functional',
  Rowing = 'rowing',
  Run = 'run',
  Swim = 'swim',
}
export enum HRZone {
  Z1 = 'Z1',
  Z2 = 'Z2',
  Z3 = 'Z3',
  Z4 = 'Z4',
  Z5 = 'Z5',
}

export interface CalendarEvent {
    type: EventType;
    time: string;
    title: string;
    location: string;
    expectedDurationInMinutes?: number;
    description?: string;
}

export interface SportEvent extends CalendarEvent {
    type: EventType.Sport;
    sportType: SportType;
    distanceInKm?: number;
    hrZone?: HRZone;
}

export interface MealEvent extends CalendarEvent {
    type: EventType.Meal;
    mealType: MealType;
    ingredients?: string[];
    preparation?: string[];
}

export type AnyEvent = CalendarEvent | MealEvent | SportEvent;

export const events: Record<string, AnyEvent[]> = {
  "2025-09-02": [
    {
      type: EventType.Meal,
      mealType: MealType.Breakfast,
      time: "09:00",
      title: "Bol de yogur con avena y arándanos",
      location: "Home",
      expectedDurationInMinutes: 10,
      description: "Un desayuno nutritivo que combina proteína del yogur, carbohidratos complejos de la avena y antioxidantes de los arándanos, perfecto para la recuperación.",
      ingredients: [
        "150g de yogur griego",
        "40g de copos de avena",
        "50g de arándanos",
      ],
      preparation: [
        "En un bol, mezcla el yogur con los copos de avena.",
        "Añade los arándanos por encima.",
      ],
    },
    {
      type: EventType.Meal,
      mealType: MealType.Lunch,
      time: "14:00",
      title: "Pechuga de pollo con boniato asado y espinacas",
      location: "Home",
      expectedDurationInMinutes: 20,
      description: "Una comida completa con proteína magra, carbohidratos complejos para reponer energía y verduras para vitaminas y minerales. No contiene cebolla ni tomate fresco.",
      ingredients: [
        "150g de pechuga de pollo",
        "200g de boniato",
        "100g de espinacas",
        "10ml de aceite de oliva virgen extra",
        "Sal y especias al gusto",
      ],
      preparation: [
        "Precalienta el horno a 200ºC. Lava y corta el boniato en rodajas.",
        "Coloca el boniato en una bandeja de horno, rocía con aceite, sal y especias. Hornea durante 25-30 minutos.",
        "Mientras, cocina la pechuga de pollo en una sartén con un poco de aceite hasta que esté dorada.",
        "Sirve el pollo con el boniato y las espinacas frescas.",
      ],
    },
    {
      type: EventType.Meal,
      mealType: MealType.Dinner,
      time: "21:00",
      title: "Salmón al horno con patata al vapor",
      location: "Home",
      expectedDurationInMinutes: 20,
      description: "Una cena ligera y de fácil digestión, rica en grasas saludables (Omega-3) para la recuperación y proteína de alta calidad.",
      ingredients: [
        "150g de salmón",
        "150g de patata",
        "10ml de aceite de oliva virgen extra",
        "Eneldo fresco",
        "Sal y pimienta al gusto",
      ],
      preparation: [
        "Precalienta el horno a 200ºC.",
        "Lava y cocina la patata al vapor.",
        "Salpimenta el salmón y cocínalo en el horno durante 15 minutos o hasta que esté hecho.",
        "Sirve el salmón con la patata y el eneldo fresco picado.",
      ],
    },
  ],
  "2025-09-03": [
    {
      type: EventType.Meal,
      mealType: MealType.Breakfast,
      time: "09:00",
      title: "Gachas de avena con yogur, plátano y nueces",
      location: "Home",
      expectedDurationInMinutes: 15,
      description: "Un desayuno energético con carbohidratos de liberación lenta, potasio del plátano y grasas saludables de las nueces. El yogur aporta la proteína necesaria.",
      ingredients: [
        "50g de copos de avena",
        "200ml de leche o bebida de almendras",
        "50g de yogur",
        "1 plátano",
        "20g de nueces",
      ],
      preparation: [
        "En un cazo, cocina los copos de avena con la leche hasta que espese.",
        "Sirve las gachas en un bol y añade el yogur, el plátano en rodajas y las nueces picadas.",
      ],
    },
    {
      type: EventType.Meal,
      mealType: MealType.Lunch,
      time: "14:00",
      title: "Arroz con pollo y zanahoria salteada",
      location: "Home",
      expectedDurationInMinutes: 20,
      description: "Una comida con alta carga de carbohidratos para mantener tu energía durante la tarde, antes del entrenamiento. No contiene cebolla.",
      ingredients: [
        "100g de pechuga de pollo",
        "80g de arroz",
        "50g de zanahoria",
        "5ml de aceite de oliva virgen extra",
      ],
      preparation: [
        "Cocina el arroz según las instrucciones del paquete.",
        "Corta la pechuga de pollo en dados y la zanahoria en juliana. Saltea ambos en una sartén con un poco de aceite de oliva.",
        "Mezcla el pollo y la zanahoria con el arroz cocido.",
      ],
    },
    {
      type: EventType.Sport,
      sportType: SportType.Bike,
      time: "17:00",
      title: "Ciclismo (Aeróbico)",
      location: "TBD",
      distanceInKm: 60,
      hrZone: HRZone.Z2,
      expectedDurationInMinutes: 120,
      description: "Este día de ciclismo es una sesión aeróbica para mejorar tu resistencia. La comida previa y posterior son clave para tu sesión de ciclismo por la tarde.",
    },
    {
      type: EventType.Meal,
      mealType: MealType.Dinner,
      time: "21:00",
      title: "Tortilla de atún y patata con tomate frito",
      location: "Home",
      expectedDurationInMinutes: 15,
      description: "Una comida reconfortante y nutritiva. El atún y los huevos aportan proteína, mientras que la patata y el tomate frito (que te gusta en salsa) aportan carbohidratos para la recuperación.",
      ingredients: [
        "2 huevos medianos",
        "1 lata de atún en agua (60g de peso escurrido)",
        "150g de patata",
        "50g de tomate frito",
      ],
      preparation: [
        "Cocina la patata al vapor.",
        "Bate los huevos y mézclalos con el atún escurrido.",
        "Cocina la tortilla en una sartén.",
        "Sirve la tortilla con la patata y el tomate frito.",
      ],
    },
  ],
  "2025-09-04": [
    {
      type: EventType.Meal,
      mealType: MealType.Breakfast,
      time: "09:00",
      title: "Porridge de avena con yogur, melocotón y semillas de chía",
      location: "Home",
      expectedDurationInMinutes: 15,
      description: "Un desayuno completo para empezar el día. La avena es un carbohidrato complejo, el yogur aporta proteína y las semillas de chía, fibra y ácidos grasos saludables.",
      ingredients: [
        "50g de copos de avena",
        "200ml de leche o bebida de almendras",
        "50g de yogur",
        "1 melocotón pequeño",
        "5g de semillas de chía",
      ],
      preparation: [
        "Prepara el porridge cocinando la avena con la leche en un cazo.",
        "Corta el melocotón en trozos y añádelos al bol con el porridge.",
        "Añade el yogur y las semillas de chía por encima.",
      ],
    },
    {
      type: EventType.Meal,
      mealType: MealType.Lunch,
      time: "14:00",
      title: "Lasaña de carne con queso",
      location: "Home",
      expectedDurationInMinutes: 25,
      description: "Una comida sustanciosa que proporciona los carbohidratos necesarios para tu sesión de la tarde y la proteína para la recuperación. No contiene cebolla.",
      ingredients: [
        "200g de carne picada de ternera",
        "150g de salsa de tomate",
        "3 láminas de lasaña precocida",
        "50g de queso mozzarella rallado",
        "Sal y especias al gusto",
      ],
      preparation: [
        "Sofríe la carne picada y mézclala con la salsa de tomate.",
        "En un recipiente apto para horno, monta las capas de lasaña, alternando con la carne y la salsa.",
        "Termina con una capa de queso mozzarella y hornea hasta que el queso se gratine.",
      ],
    },
    {
      type: EventType.Sport,
      sportType: SportType.Strength,
      time: "17:00",
      title: "Fuerza (Tren Superior y Agarre)",
      location: "Gimnasio",
      expectedDurationInMinutes: 90,
      distanceInKm: 0,
      hrZone: HRZone.Z3,
      description: "Un día de fuerza enfocado en el tren superior y el agarre. La recuperación es clave después de una sesión de fuerza."
    },
    {
      type: EventType.Meal,
      mealType: MealType.Dinner,
      time: "21:00",
      title: "Bacalao con pisto",
      location: "Home",
      expectedDurationInMinutes: 20,
      description: "Una cena ligera, rica en proteínas y con carbohidratos del pisto, ideal para la reparación muscular. El pisto solo contiene tomate y calabacín, pero he revisado tu lista de alimentos a evitar y he visto que no te gusta el calabacín, por lo que he hecho una variante para ti.",
      ingredients: [
        "150g de bacalao fresco",
        "100g de pisto de hortalizas (sin calabacín)",
        "5ml de aceite de oliva virgen extra",
      ],
      preparation: [
        "Precalienta el horno a 180ºC.",
        "Coloca el bacalao sobre una cama de pisto en una bandeja de horno.",
        "Rocía con aceite de oliva y hornea durante 15 minutos.",
      ],
    },
  ],
  // ... (additional dates/events follow in the same structure) ...
};
