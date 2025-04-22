import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface TournamentStartup {
  id?: number;
  tournament: number;
  startup: number;
  currentScore?: number;
  eliminated: boolean;
  createdAt?: string;
}

// Listar todas as relações torneio-startup
export async function getTournamentStartups() {
  const response = await fetch(`${API_BASE_URL}/tournament-startups`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Listar startups de um torneio específico
export async function getTournamentStartupsByTournament(tournamentId: number) {
  const response = await fetch(`${API_BASE_URL}/tournament-startups/${tournamentId}/startups`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar uma relação torneio-startup por ID
export async function getTournamentStartupById(id: number) {
  const response = await fetch(`${API_BASE_URL}/tournament-startups/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar uma nova relação torneio-startup
export async function createTournamentStartup(tournamentStartup: TournamentStartup) {
  const response = await fetch(`${API_BASE_URL}/tournament-startups`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(tournamentStartup),
  });
  return handleResponse(response);
}

// Atualizar uma relação torneio-startup existente
export async function updateTournamentStartup(id: number, tournamentStartup: TournamentStartup) {
  const response = await fetch(`${API_BASE_URL}/tournament-startups/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(tournamentStartup),
  });
  return handleResponse(response);
}

// Excluir uma relação torneio-startup
export async function deleteTournamentStartup(id: number) {
  const response = await fetch(`${API_BASE_URL}/tournament-startups/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}
