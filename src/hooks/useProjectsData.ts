import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapProject } from '../lib/mappers';
import { Project } from '../data/projects';
import { projects as staticProjects } from '../data/projects';

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setProjects(data.map(mapProject));
      }
      setLoading(false);
    })();
  }, []);

  const getById = (id: string) => projects.find((p) => p.id === id);
  const getRelated = (currentId: string, limit = 3) =>
    projects.filter((p) => p.id !== currentId).slice(0, limit);

  return { projects, loading, getById, getRelated };
}
