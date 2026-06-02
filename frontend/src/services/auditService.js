import api from './api';

export const analyzeCode = async (code, language) => {
  const response = await api.post('/api/audit', { code, language });
  return response.data; // CodeAnalysisResponse
};

export const getHistory = async () => {
  const response = await api.get('/api/audit/history');
  return response.data; // List<AuditRecord>
};