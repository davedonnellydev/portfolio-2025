import { fireEvent, render, screen } from '@/test-utils';
import { ProjectSearch } from './ProjectSearch';

// Mock Tabler icons
jest.mock('@tabler/icons-react', () => ({
  IconSearch: () => <div data-testid="icon-search">Search Icon</div>,
  IconX: () => <div data-testid="icon-x">X Icon</div>,
}));

describe('ProjectSearch', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders search input with placeholder', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText('Search projects by title or description...');
      expect(input).toBeInTheDocument();
    });

    it('renders search icon', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      expect(screen.getByTestId('icon-search')).toBeInTheDocument();
    });

    it('displays the current search query value', () => {
      render(<ProjectSearch searchQuery="React projects" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText(
        'Search projects by title or description...'
      ) as HTMLInputElement;
      expect(input.value).toBe('React projects');
    });

    it('does not show result count when not provided', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      expect(screen.queryByText(/project/)).not.toBeInTheDocument();
    });

    it('shows result count when provided', () => {
      render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={5} />
      );

      expect(screen.getByText('5 projects found')).toBeInTheDocument();
    });

    it('uses singular "project" when count is 1', () => {
      render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={1} />
      );

      expect(screen.getByText('1 project found')).toBeInTheDocument();
    });

    it('uses plural "projects" when count is 0', () => {
      render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={0} />
      );

      expect(screen.getByText('0 projects found')).toBeInTheDocument();
    });

    it('uses plural "projects" when count is greater than 1', () => {
      render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={3} />
      );

      expect(screen.getByText('3 projects found')).toBeInTheDocument();
    });
  });

  describe('Search Interaction', () => {
    it('calls onSearchChange when input value changes', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText('Search projects by title or description...');
      fireEvent.change(input, { target: { value: 'React' } });

      expect(mockOnSearchChange).toHaveBeenCalledWith('React');
      expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    });

    it('calls onSearchChange with empty string when cleared', () => {
      render(<ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText('Search projects by title or description...');
      fireEvent.change(input, { target: { value: '' } });

      expect(mockOnSearchChange).toHaveBeenCalledWith('');
    });

    it('updates on multiple keystrokes', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText('Search projects by title or description...');

      fireEvent.change(input, { target: { value: 'R' } });
      expect(mockOnSearchChange).toHaveBeenCalledWith('R');

      fireEvent.change(input, { target: { value: 'Re' } });
      expect(mockOnSearchChange).toHaveBeenCalledWith('Re');

      fireEvent.change(input, { target: { value: 'React' } });
      expect(mockOnSearchChange).toHaveBeenCalledWith('React');

      expect(mockOnSearchChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Clear Button', () => {
    it('does not show clear button when search query is empty', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('shows clear button when search query has value', () => {
      render(<ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} />);

      expect(screen.getByTestId('icon-x')).toBeInTheDocument();
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('calls onSearchChange with empty string when clear button is clicked', () => {
      render(<ProjectSearch searchQuery="test query" onSearchChange={mockOnSearchChange} />);

      const clearButton = screen.getByLabelText('Clear search');
      fireEvent.click(clearButton);

      expect(mockOnSearchChange).toHaveBeenCalledWith('');
      expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has accessible label for clear button', () => {
      render(<ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} />);

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('input is keyboard accessible', () => {
      render(<ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText('Search projects by title or description...');
      expect(input).toBeInTheDocument();

      // Focus the input
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('clear button is keyboard accessible', () => {
      render(<ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} />);

      const clearButton = screen.getByLabelText('Clear search');

      // Clear button should be focusable
      clearButton.focus();
      expect(document.activeElement).toBe(clearButton);
    });
  });

  describe('Edge Cases', () => {
    it('handles very long search queries', () => {
      const longQuery = 'a'.repeat(200);
      render(<ProjectSearch searchQuery={longQuery} onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText(
        'Search projects by title or description...'
      ) as HTMLInputElement;
      expect(input.value).toBe(longQuery);
    });

    it('handles special characters in search query', () => {
      const specialQuery = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<ProjectSearch searchQuery={specialQuery} onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText(
        'Search projects by title or description...'
      ) as HTMLInputElement;
      expect(input.value).toBe(specialQuery);
    });

    it('handles zero result count', () => {
      render(
        <ProjectSearch
          searchQuery="nonexistent"
          onSearchChange={mockOnSearchChange}
          resultCount={0}
        />
      );

      expect(screen.getByText('0 projects found')).toBeInTheDocument();
    });

    it('handles large result counts', () => {
      render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={9999} />
      );

      expect(screen.getByText('9999 projects found')).toBeInTheDocument();
    });

    it('handles whitespace-only queries', () => {
      render(<ProjectSearch searchQuery="   " onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText(
        'Search projects by title or description...'
      ) as HTMLInputElement;
      expect(input.value).toBe('   ');

      // Clear button should appear (has value, even if whitespace)
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });
  });

  describe('Result Count Formatting', () => {
    it('correctly pluralizes for different counts', () => {
      const { rerender } = render(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={0} />
      );
      expect(screen.getByText('0 projects found')).toBeInTheDocument();

      rerender(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={1} />
      );
      expect(screen.getByText('1 project found')).toBeInTheDocument();

      rerender(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={2} />
      );
      expect(screen.getByText('2 projects found')).toBeInTheDocument();

      rerender(
        <ProjectSearch searchQuery="test" onSearchChange={mockOnSearchChange} resultCount={100} />
      );
      expect(screen.getByText('100 projects found')).toBeInTheDocument();
    });
  });

  describe('Integration Scenarios', () => {
    it('works correctly in typical search flow', () => {
      const { rerender } = render(
        <ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} resultCount={10} />
      );

      // Initial state
      expect(screen.getByText('10 projects found')).toBeInTheDocument();
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();

      // User types
      const input = screen.getByPlaceholderText('Search projects by title or description...');
      fireEvent.change(input, { target: { value: 'React' } });
      expect(mockOnSearchChange).toHaveBeenCalledWith('React');

      // Rerender with new state
      rerender(
        <ProjectSearch searchQuery="React" onSearchChange={mockOnSearchChange} resultCount={3} />
      );
      expect(screen.getByText('3 projects found')).toBeInTheDocument();
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();

      // User clears
      const clearButton = screen.getByLabelText('Clear search');
      fireEvent.click(clearButton);
      expect(mockOnSearchChange).toHaveBeenCalledWith('');

      // Rerender with cleared state
      rerender(
        <ProjectSearch searchQuery="" onSearchChange={mockOnSearchChange} resultCount={10} />
      );
      expect(screen.getByText('10 projects found')).toBeInTheDocument();
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });
  });
});
