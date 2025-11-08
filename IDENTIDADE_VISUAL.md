# 🎨 Identidade Visual Integra Prontuário

Documentação completa da identidade visual do **Integra Prontuário**, alinhada com o site oficial da empresa.

---

## 🌈 Paleta de Cores

### Cores Principais da Marca

#### 🔵 Azul Turquesa (Primary)
```css
--integra-turquoise: #1BA0A4
```
**Uso**: Cor principal, botões primários, links, destaques  
**Significado**: Comunicação fluida, confiança, profissionalismo  
**Onde usar**: Botões de ação, cabeçalhos importantes, links

**Variações:**
- Normal: `#1BA0A4`
- Hover/Active: `#15777A` (700)
- Light: `#67CCC9` (cyan)

#### 🌊 Azul Petróleo (Secondary)
```css
--integra-petroleum: #275E65
```
**Uso**: Elementos secundários, fundos de cartões, bordas  
**Significado**: Serenidade, estabilidade, confiança  
**Onde usar**: Sidebar ativo, títulos, elementos de destaque

**Variações:**
- Normal: `#275E65`
- Hover/Active: `#1F4A4F` (700)
- Darker: `#0F363F`
- Darkest: `#051A21` (para títulos)
- Navy: `#002E38` (muito escuro)

#### 🟢 Verde Lima (Accent)
```css
--integra-lime: #90BC21
```
**Uso**: Cor de accent, destaque positivo, sucesso  
**Significado**: Esperança, vitalidade, saúde  
**Onde usar**: Mensagens de sucesso, badges positivos, ícones de confirmação

**Variações:**
- Normal: `#90BC21`
- Hover/Active: `#6A8E17` (700)

### Cores Neutras

#### ⚪ Branco Gelo
```css
--integra-ice: #F7FBFC
```
**Uso**: Background principal, espaços em branco  
**Onde usar**: Fundo da página, cards claros

#### 💙 Azul Muito Claro
```css
--integra-light-blue: #EAF2F2
--color-bg-soft: #EEF6F7
```
**Uso**: Fundos suaves, seções alternadas  
**Onde usar**: Backgrounds de seções, alternância de linhas em tabelas

#### 🖊️ Textos
```css
--integra-text-nav: #455254
--color-muted: #475569
```
**Uso**: Textos secundários, navegação  
**Onde usar**: Labels, textos auxiliares, placeholders

### Cores Utilitárias

#### Bordas
```css
--color-border: #D9E4E6
```

#### Gradientes
```css
/* Gradiente da marca */
.brand-gradient {
  background: linear-gradient(135deg, #1BA0A4 0%, #275E65 100%);
}

/* Gradiente accent */
background: linear-gradient(90deg, #90BC21, #1BA0A4);
```

---

## 🎭 Componentes com Cores da Marca

### Tailwind Config

As cores já estão configuradas no `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#275E65', // petroleum
    // ...variações de 50 a 950
  },
  secondary: {
    DEFAULT: '#1BA0A4', // turquoise
    // ...variações de 50 a 950
  },
  tertiary: {
    DEFAULT: '#90BC21', // lime
    // ...variações de 50 a 950
  },
}
```

### Uso no Tailwind

```tsx
// Botão primário (petroleum)
<Button className="bg-primary hover:bg-primary-700">
  Salvar
</Button>

// Botão secondary (turquoise)
<Button className="bg-secondary hover:bg-secondary-700">
  Adicionar
</Button>

// Badge accent (lime)
<Badge className="bg-tertiary">
  Novo
</Badge>

// Card com fundo suave
<Card className="section-soft">
  Conteúdo
</Card>
```

---

## 🖼️ Logos e Ícones

### Logos Disponíveis

#### Logo Principal
```
/public/Logo.png
```
**Uso**: Sidebar, header, tela de login  
**Formato**: PNG com transparência  
**Tamanho recomendado**: height: 40px (auto width)

#### Logo Alternativa
```
/public/Logo2.png
```
**Uso**: Versão alternativa quando necessário

#### Símbolo Integra
```
/public/integra-symbol.svg
```
**Uso**: Favicon, ícones pequenos, loader  
**Formato**: SVG vetorial

### Implementação

```tsx
// Sidebar
<img
  src="/Logo.png"
  alt="Integra Prontuário"
  className="h-10 object-contain"
/>

// Header mobile
<img
  src="/Logo.png"
  alt="Integra"
  className="h-8 object-contain"
/>

// Loader / Favicon
<img
  src="/integra-symbol.svg"
  alt="Integra"
  className="w-12 h-12"
/>
```

---

## 🎨 Classes Utilitárias Customizadas

### Disponíveis em `src/index.css`

#### 1. Gradiente da Marca
```tsx
<div className="brand-gradient p-6 text-white">
  Conteúdo com gradiente
</div>
```

#### 2. Link da Marca
```tsx
<a href="#" className="brand-link">
  Link com cor da marca
</a>
```

#### 3. Título com Accent
```tsx
<h2 className="title-accent text-2xl font-bold">
  Título com sublinhado gradiente
</h2>
```

#### 4. Seção com Fundo Suave
```tsx
<section className="section-soft p-8">
  Seção com background suave
</section>
```

---

## 🖱️ Scrollbar Customizado

O scrollbar já está customizado com as cores da Integra:

**Track (fundo)**: Azul muito claro (`#EAF2F2`)  
**Thumb (barra)**: Gradiente turquesa → ciano  
**Hover**: Mais intenso  

Automático em todo o site!

---

## 📊 Hierarquia de Cores por Uso

### Prioridade 1: Ações Principais
- **Botões primários**: Turquoise (`#1BA0A4`)
- **Links importantes**: Turquoise
- **CTAs**: Turquoise com hover mais escuro

### Prioridade 2: Elementos Secundários
- **Sidebar ativo**: Petroleum (`#275E65`)
- **Títulos importantes**: Petroleum darkest
- **Bordas de destaque**: Petroleum darker

### Prioridade 3: Feedback Positivo
- **Sucesso**: Lime (`#90BC21`)
- **Badges positivos**: Lime
- **Ícones de confirmação**: Lime

### Fundos
- **Principal**: Branco (`#FFFFFF`)
- **Alternado**: Ice (`#F7FBFC`)
- **Suave**: Bg-soft (`#EEF6F7`)

---

## 🎯 Exemplos de Uso

### Card de Paciente
```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
    <CardTitle className="text-primary">
      João Silva
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Badge className="bg-tertiary text-white">
      RCP
    </Badge>
  </CardContent>
</Card>
```

### Botões de Ação
```tsx
// Salvar (primary)
<Button className="bg-secondary hover:bg-secondary-700">
  <Save className="mr-2 h-4 w-4" />
  Salvar
</Button>

// Adicionar (accent)
<Button className="bg-tertiary hover:bg-tertiary-700">
  <Plus className="mr-2 h-4 w-4" />
  Adicionar
</Button>

// Ver detalhes (outline)
<Button variant="outline" className="border-primary text-primary">
  <Eye className="mr-2 h-4 w-4" />
  Ver Detalhes
</Button>
```

### Tabelas
```tsx
<Table>
  <TableHeader className="bg-primary/5">
    <TableRow>
      <TableHead className="text-primary">Nome</TableHead>
      <TableHead className="text-primary">Área</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-secondary/5">
      {/* conteúdo */}
    </TableRow>
  </TableBody>
</Table>
```

### Status e Badges
```tsx
// Sucesso / Ativo
<Badge className="bg-tertiary">Ativo</Badge>

// Info / Padrão
<Badge className="bg-secondary">RCP</Badge>

// Destaque
<Badge className="bg-primary">Novo</Badge>
```

---

## 🎨 Modo Escuro (Dark Mode)

O projeto suporta dark mode. As cores se adaptam automaticamente:

**Primary**: Turquoise fica mais claro  
**Secondary**: Petroleum fica mais suave  
**Backgrounds**: Inverte para tons escuros  

As variáveis CSS já estão configuradas para ambos os modos.

---

## 📋 Checklist de Consistência

Ao criar novos componentes, verifique:

- [ ] Usa cores da paleta Integra
- [ ] Botões primários são turquoise
- [ ] Elementos de destaque são petroleum
- [ ] Feedback positivo é lime
- [ ] Logo oficial está sendo usada
- [ ] Gradientes seguem o padrão
- [ ] Hover states estão definidos
- [ ] Contraste de texto está adequado

---

## 🔗 Variáveis CSS Rápidas

Para usar diretamente no CSS:

```css
/* Cores principais */
color: var(--integra-turquoise);
background: var(--integra-petroleum);
border-color: var(--integra-lime);

/* Tokens utilitários */
color: var(--color-primary);
background: var(--color-accent);
border-color: var(--color-border);

/* Fundos */
background: var(--integra-ice);
background: var(--color-bg-soft);
```

---

## 📚 Referências

- **Site oficial**: As cores estão sincronizadas com o site da empresa
- **Tailwind**: Todas as cores têm escala completa (50-950)
- **Acessibilidade**: Contrastes validados para WCAG AA

---

**Versão**: 1.0  
**Última atualização**: Janeiro 2025  
**Projeto**: Integra Prontuário

