import { ReactNode } from 'react';
import Counter from '../components/Counter/Counter';
import Modal from '../components/Modal/Modal';
import Button from '../components/ui/Button';

interface ICardProps {
  children: ReactNode;
}

function Card({ children }: ICardProps) {
  return <div className="p-4 rounded-lg bg-slate-800">{children}</div>;
}

export default function HomePage() {
  return (
    <div className="py-12 text-balance">
      <p>
        In React, reusing components is a fundamental concept that helps
        maintain DRY (Don't Repeat Yourself) principles, improve
        maintainability, and keep the UI consistent. Here are several ways to
        reuse components in React:
      </p>

      <h2 className="py-4 text-3xl">1. Component Props</h2>
      <p>
        You can pass different values as props to the same component to render
        it with different data or styles.
      </p>
      <div className="flex gap-4 py-4">
        <Button label="Submit" onClick={() => alert('Submitted')} />
        <Button label="Cancel" onClick={() => alert('Cancelled')} />
      </div>
      <p>
        Here, the `Button` component is reused with different labels and
        behaviors.
      </p>

      <h2 className="py-4 text-3xl">4. Component Composition</h2>
      <p>
        You can reuse components by composing smaller components inside a parent
        component.
      </p>
      <div className="flex gap-4 py-4">
        <Card>
          <h2>Title One</h2>
          <p>This is a card with text content.</p>
        </Card>
        <Card>
          <h2>Title Two</h2>
          <p>This is a card with another content.</p>
        </Card>
      </div>
      <p>
        Here, the `Card` component is reused for different types of content.
      </p>

      <h2 className="py-4 text-3xl">5. Custom Hooks</h2>
      <p>
        Custom hooks allow you to extract and reuse logic between components.
      </p>
      <Counter />
      <p>
        Here, the `useCounter` hook can be reused in multiple components to
        provide counter functionality.
      </p>

      <h2 className="py-4 text-3xl">
        6. Portals for Reuse Across DOM Hierarchy
      </h2>
      <p>
        Portals provide a way to render children into a DOM node that exists
        outside the parent component. 👇
      </p>
      <Modal>
        <p>This is a modal content.</p>
        <p>This content will be rendered outside the root div.</p>
        <p>Inspect and see DOM tree.</p>
      </Modal>
      <p className="py-2">
        The `Modal` component can be reused across different parts of the app,
        even if the DOM structure is different.
      </p>
    </div>
  );
}
