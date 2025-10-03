import { IconSearch, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Text, TextInput } from '@mantine/core';

interface ProjectSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
}

export function ProjectSearch({ searchQuery, onSearchChange, resultCount }: ProjectSearchProps) {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <Group gap="md" align="flex-end">
      <TextInput
        placeholder="Search projects by title or description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        leftSection={<IconSearch size={16} />}
        rightSection={
          searchQuery ? (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <IconX size={14} />
            </ActionIcon>
          ) : null
        }
        size="md"
        radius="md"
        style={{ flex: 1 }}
        styles={{
          input: {
            transition: 'all 0.2s ease',
            '&:focus': {
              borderColor: 'var(--mantine-color-indigo-5)',
              boxShadow: '0 0 0 1px var(--mantine-color-indigo-5)',
            },
          },
        }}
      />

      {resultCount !== undefined && (
        <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
          {resultCount} project{resultCount !== 1 ? 's' : ''} found
        </Text>
      )}
    </Group>
  );
}
