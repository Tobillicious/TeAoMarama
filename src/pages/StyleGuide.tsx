// ...existing code...
import Button from '../components/Button'
import Card from '../components/Card'
import '../styles/styleguide.css'

export default function StyleGuide() {return (
    <div className="max-w-[960px] mx-auto px-6 py-12">
      <h1>Style Guide</h1>
      <section className="mt-6">
        <h2>Colors</h2>
        <div className="flex gap-4 mt-4">
          <div className="color-swatch bg">bg</div>
          <div className="color-swatch surface">surface</div>
          <div className="color-swatch accent">accent</div>
        </div>
      </section>

      <section className="mt-8">
        <h2>Typography</h2>
        <h1>H1 headline</h1>
        <h2>H2 headline</h2>
        <p className="lead">Lead text example</p>
      </section>

      <section className="mt-8">
        <h2>Components</h2>
        <div className="flex gap-4 mt-4">
          <Button>Primary</Button>
          <Button variant="muted">Muted</Button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <Card title="Card example" description="A short description" />
          <Card title="Card example" description="A short description" />
          <Card title="Card example" description="A short description" />
        </div>
      </section>
    </div>
  )}
