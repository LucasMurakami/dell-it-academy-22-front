import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface BattleEvent {
  id?: number;
  battle: number;
  startup: number;
  eventType: number;
  createdAt?: string;
}

// Listar todos os eventos de batalha
export async function getBattleEvents() {
  const response = await fetch(`${API_BASE_URL}/battle-events`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar um evento de batalha por ID
export async function getBattleEventById(id: number) {
  const response = await fetch(`${API_BASE_URL}/battle-events/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

export async function getBattleEventsByBattleAndStartup(battleId: number, startupId: number) {
  const response = await fetch(`${API_BASE_URL}/battle-events/battle/${battleId}/startup/${startupId}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar eventos de batalha por batalha e startup do torneio
export async function getBattleEventsByBattleAndTournamentStartup(battleId: number, startupId: number) {
  const response = await fetch(`${API_BASE_URL}/battle-events/by-battle-tournament-startup?battleId=${battleId}&startupId=${startupId}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Listar eventos de uma batalha específica
export async function getEventsByBattle(battleId: number) {
  const response = await fetch(`${API_BASE_URL}/battles/${battleId}/events`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar um novo evento de batalha
export async function createBattleEvent(battleEvent: BattleEvent) {
  const response = await fetch(`${API_BASE_URL}/battle-events`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(battleEvent),
  });
  return handleResponse(response);
}

// Atualizar um evento de batalha existente
export async function updateBattleEvent(id: number, battleEvent: BattleEvent) {
  const response = await fetch(`${API_BASE_URL}/battle-events/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(battleEvent),
  });
  return handleResponse(response);
}

// Excluir um evento de batalha
export async function deleteBattleEvent(id: number) {
  const response = await fetch(`${API_BASE_URL}/battle-events/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}