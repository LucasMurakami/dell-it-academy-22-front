export const dummyStartups = [
  { id: 1, name: "Startup 1", slogan: "Inovando o futuro", founded_year: 2020, created_at: "2025-04-01T10:00:00Z" },
  { id: 2, name: "Startup 2", slogan: "Soluções inteligentes", founded_year: 2019, created_at: "2025-04-02T11:00:00Z" },
  { id: 3, name: "Startup 3", slogan: "Transformando ideias", founded_year: 2021, created_at: "2025-04-03T12:00:00Z" },
];

export const dummyTournaments = [
  { id: 1, name: "Torneio de Inovação 2025", status: "Ativo", champion_id: null, created_at: "2025-04-01T10:00:00Z" },
  { id: 2, name: "Torneio de Primavera 2024", status: "Concluído", champion_id: 1, created_at: "2024-09-01T10:00:00Z" },
];

export const dummyTournamentStartups = [
  { id: 1, tournament_id: 1, startup_id: 1, initial_score: 70, current_score: 85, eliminated: false },
  { id: 2, tournament_id: 1, startup_id: 2, initial_score: 70, current_score: 78, eliminated: true },
  { id: 3, tournament_id: 1, startup_id: 3, initial_score: 70, current_score: 90, eliminated: false },
  { id: 4, tournament_id: 2, startup_id: 1, initial_score: 70, current_score: 100, eliminated: false },
];

export const dummyBattles = [
  {
    id: 1,
    tournament_id: 1,
    startup1_id: 1,
    startup2_id: 2,
    winner_id: 1,
    shark_fight: false,
    completed: true,
    round_number: 1,
    created_at: "2025-04-10T10:00:00Z",
  },
  {
    id: 2,
    tournament_id: 1,
    startup1_id: 3,
    startup2_id: 1,
    winner_id: null,
    shark_fight: true,
    completed: false,
    round_number: null,
    created_at: "2025-04-11T10:00:00Z",
  },
];

export const dummyEventTypes = [
  { id: 1, name: "Apresentação Excelente", score_modifier: 10 },
  { id: 2, name: "Resposta Fraca", score_modifier: -5 },
  { id: 3, name: "Inovação Extraordinária", score_modifier: 15 },
];

export const dummyBattleEvents = [
  { id: 1, battle_id: 1, startup_id: 1, event_type_id: 1, points: 10, created_at: "2025-04-10T10:30:00Z" },
  { id: 2, battle_id: 1, startup_id: 2, event_type_id: 2, points: -5, created_at: "2025-04-10T10:35:00Z" },
  { id: 3, battle_id: 2, startup_id: 3, event_type_id: 3, points: 15, created_at: "2025-04-11T10:45:00Z" },
];