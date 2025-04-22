import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface EventType {
  id?: number;
  name: string;
  scoreModifier: number;
}

// Listar todos os tipos de eventos
export async function getEventTypes() {
  const response = await fetch(`${API_BASE_URL}/event-types`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar um tipo de evento por ID
export async function getEventTypeById(id: number) {
  const response = await fetch(`${API_BASE_URL}/event-types/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar um novo tipo de evento
export async function createEventType(eventType: EventType) {
  const response = await fetch(`${API_BASE_URL}/event-types`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(eventType),
  });
  return handleResponse(response);
}

// Atualizar um tipo de evento existente
export async function updateEventType(id: number, eventType: EventType) {
  const response = await fetch(`${API_BASE_URL}/event-types/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(eventType),
  });
  return handleResponse(response);
}

// Excluir um tipo de evento
export async function deleteEventType(id: number) {
  const response = await fetch(`${API_BASE_URL}/event-types/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}