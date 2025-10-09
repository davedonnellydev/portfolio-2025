import { useState } from 'react';
import { ProjectSearch } from './ProjectSearch';

export default {
  title: 'Projects/ProjectSearch',
  component: ProjectSearch,
};

export const Default = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    </div>
  );
};

export const WithQuery = () => {
  const [searchQuery, setSearchQuery] = useState('React project');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    </div>
  );
};

export const WithResultCount = () => {
  const [searchQuery, setSearchQuery] = useState('learning');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={3} />
    </div>
  );
};

export const NoResults = () => {
  const [searchQuery, setSearchQuery] = useState('xyz123');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={0} />
    </div>
  );
};

export const SingleResult = () => {
  const [searchQuery, setSearchQuery] = useState('specific');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={1} />
    </div>
  );
};

export const ManyResults = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={42} />
    </div>
  );
};

export const Interactive = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    { title: 'React Learning Platform', description: 'An e-learning app built with React' },
    { title: 'Node.js API', description: 'RESTful API with Node and Express' },
    { title: 'Python ML Project', description: 'Machine learning with Python and TensorFlow' },
    { title: 'React Native App', description: 'Mobile app built with React Native' },
    { title: 'Vue.js Dashboard', description: 'Analytics dashboard with Vue' },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProjects.length}
      />

      <div style={{ marginTop: '24px' }}>
        <h3>Results</h3>
        {filteredProjects.length === 0 ? (
          <p>No projects found matching "{searchQuery}"</p>
        ) : (
          <ul>
            {filteredProjects.map((project, i) => (
              <li key={i}>
                <strong>{project.title}</strong>
                <br />
                <span style={{ color: '#888', fontSize: '14px' }}>{project.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const LongQuery = () => {
  const [searchQuery, setSearchQuery] = useState(
    'This is a very long search query that demonstrates how the component handles overflow text'
  );

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={1} />
    </div>
  );
};

export const SpecialCharacters = () => {
  const [searchQuery, setSearchQuery] = useState('React.js & Node.js');

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={2} />
    </div>
  );
};

export const MobileWidth = () => {
  const [searchQuery, setSearchQuery] = useState('React');

  return (
    <div style={{ padding: '20px', maxWidth: '320px' }}>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={5} />
    </div>
  );
};
