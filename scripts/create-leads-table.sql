-- Creează tabela pentru lead-uri
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nume VARCHAR(100) NOT NULL,
  prenume VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefon VARCHAR(20) NOT NULL,
  tip_asigurare VARCHAR(100) NOT NULL,
  mesaj TEXT,
  status VARCHAR(20) DEFAULT 'nou' CHECK (status IN ('nou', 'contactat', 'vandut', 'refuzat')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creează index pentru căutări rapide
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
