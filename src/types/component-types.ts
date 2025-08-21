// Component type definitions
export type PageComponent = React.FC;
export type NavigationComponent = React.FC;
export type FormComponent = React.FC<{ onSubmit: (data: unknown) => void }>;