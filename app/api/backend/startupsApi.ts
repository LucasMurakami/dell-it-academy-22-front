import { API_BASE_URL, defaultOptions, handleResponse } from './apiConfig';

export interface Startup {
  id?: number;
  name: string;
  slogan: string;
  foundedYear: number;
  createdAt?: string;
  description?: string;
}

// Listar todas as startups
export async function getStartups() {
  const response = await fetch(`${API_BASE_URL}/startups`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Buscar uma startup por ID
export async function getStartupById(id: number) {
  const response = await fetch(`${API_BASE_URL}/startups/${id}`, {
    method: 'GET',
    ...defaultOptions,
  });
  return handleResponse(response);
}

// Criar uma nova startup
export async function createStartup(startup: Startup) {
  const response = await fetch(`${API_BASE_URL}/startups`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify(startup),
  });
  return handleResponse(response);
}

// Atualizar uma startup existente
export async function updateStartup(id: number, startup: Startup) {
  const response = await fetch(`${API_BASE_URL}/startups/${id}`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify(startup),
  });
  return handleResponse(response);
}

// Excluir uma startup
export async function deleteStartup(id: number) {
  const response = await fetch(`${API_BASE_URL}/startups/${id}`, {
    method: 'DELETE',
    ...defaultOptions,
  });
  return handleResponse(response);
}