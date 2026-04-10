import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Dave Njeru
          </h1>
          <p className="text-sm text-muted-foreground">AI Digital Twin</p>
        </div>
        <Twin />
      </div>
    </main>
  );
}
