import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface Battle {
  id?: number;
  battleNumber?: number | null;
  roundNumber?: number | null;
  sharkFight: boolean;
  completed: boolean;
  createdAt?: string;
  tournament?: number;
  startup1?: number | null;
  startup2?: number | null;
  winner?: number | null;
}

// Listar todas as batalhas
export async function getBattles() {
  const response = await fetch(`${API_BASE_URL}/battles`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar uma batalha por ID
export async function getBattleById(id: number) {
  const response = await fetch(`${API_BASE_URL}/battles/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Listar batalhas de um torneio específico
export async function getBattlesByTournament(tournamentId: number) {
  const response = await fetch(`${API_BASE_URL}/tournaments/${tournamentId}/battles`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar uma nova batalha
export async function createBattle(battle: Battle) {
  const response = await fetch(`${API_BASE_URL}/battles`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(battle),
  });
  return handleResponse(response);
}

// Atualizar uma batalha existente
export async function updateBattle(id: number, battle: Battle) {
  const response = await fetch(`${API_BASE_URL}/battles/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(battle),
  });
  return handleResponse(response);
}

// Finalizar uma batalha (definir vencedor)
export async function finalizeBattle(id: number, winnerId: number) {
  const response = await fetch(`${API_BASE_URL}/battles/${id}/finalize`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify({ winner_id: winnerId }),
  });
  return handleResponse(response);
}

// Excluir uma batalha
export async function deleteBattle(id: number) {
  const response = await fetch(`${API_BASE_URL}/battles/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}