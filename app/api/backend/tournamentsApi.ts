import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface Tournament {
  id?: number;
  name: string;
  status: string;
  champion?: number | null;
  createdAt?: string;
}

// Listar todos os torneios
export async function getTournaments() {
  const response = await fetch(`${API_BASE_URL}/tournaments`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar um torneio por ID
export async function getTournamentById(id: number) {
  const response = await fetch(`${API_BASE_URL}/tournaments/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar um novo torneio
export async function createTournament(tournament: Tournament) {
  const response = await fetch(`${API_BASE_URL}/tournaments`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(tournament),
  });
  return handleResponse(response);
}

// Atualizar um torneio existente
export async function updateTournament(id: number, tournament: Tournament) {
  const response = await fetch(`${API_BASE_URL}/tournaments/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(tournament),
  });
  return handleResponse(response);
}

// Excluir um torneio
export async function deleteTournament(id: number) {
  const response = await fetch(`${API_BASE_URL}/tournaments/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}