import useSWR from 'swr';
import api from '../lib/api';
import { mapProject } from '../lib/mappers';
import { Project } from '../data/projects';
import { projects as staticProjects } from '../data/projects';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useProjectsData() {
  const { data, error, isLoading } = useSWR('/projects', fetcher);

  const projects: Project[] = data && data.length > 0 
    ? data.map(mapProject) 
    : staticProjects;

  const loading = isLoading;

  const getById = (id: string) => projects.find((p) => p.id === id);
  const getRelated = (currentId: string, limit = 3) =>
    projects.filter((p) => p.id !== currentId).slice(0, limit);

  return { projects, loading, getById, getRelated };
}
