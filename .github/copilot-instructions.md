# Blessing Lynnwood - Copilot Instructions

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Set `changeDetection: ChangeDetectionStrategy.OnPush` always
- Use signals for local state; `computed()` for derived state
- Use `@if`, `@for`, `@switch` native control flow (no `*ngIf`, `*ngFor`, `*ngSwitch`)
- Bind classes/styles directly (no `ngClass`, `ngStyle`)
- Prefer external templates for pages; inline for small components
- Use `TranslateModule` when component uses i18n pipes

### State Management

- Signals: use `set()` or `update()` — never `mutate()`
- Local state in components; share via services only if truly needed

### Services

- Use `providedIn: 'root'` for singletons; inject via `inject()`
- Example: `private translate = inject(TranslateService);`

### Images

- Use `NgOptimizedImage` for static images (not inline base64)
- Path assets from `public/` folder

### i18n & Translations

- **Display-only components**: Import `TranslateModule`; use `{{ 'key' | translate }}` in templates—no service injection needed
- **Language switching**: Only inject `TranslateService` when changing language programmatically (e.g., Header's language toggle)
- **Translation files**: `public/assets/i18n/{en,af}.json` organized by namespace (nav, hero, amenities, etc.)
- **Initialization**: Root App component sets fallback language and default language in constructor

## Common Workflows

### Add a New Page

1. Create `src/app/pages/{page-name}/` with `.ts`, `.html`, `.css` files
2. Export component in same directory
3. Add route to `app.routes.ts`
4. Add i18n keys to `public/assets/i18n/{en,af}.json`

### Add a New Component

1. Create `src/app/components/{component-name}/` with `.ts`, `.html`, `.css`
2. Use Tailwind classes in template; leave `.css` empty unless component-scoped styles needed
3. Import in parent component's `imports` array

### Add Translation Keys

- Add keys to both `en.json` and `af.json` in `public/assets/i18n/`
- Use in template: `{{ 'section.key' | translate }}`

### Run & Build

- **Dev**: `npm start` (or `bun start`) → http://localhost:4200
- **Test**: `npm test` (Karma + Jasmine)
- **Build**: `npm build` → `dist/`

## Project-Specific Conventions

- **Naming**: Components use PascalCase class names (e.g., `export class Header { }`)
- **Selectors**: `app-*` prefix (e.g., `selector: 'app-header'`)
- **File layout**: Flat structure within each folder (no subdirectories for components)
- **Translation namespaces**: Use dot notation (`nav.home`, `footer.contact`)
- **Colors**: Always use Tailwind custom tokens from `@theme` (e.g., `bg-primary-50`, `text-sage-40`)
- **Responsive**: Use Tailwind breakpoints; design is component-driven, not page-locked

## Common Pitfalls to Avoid

- Don't add empty `standalone: true` to decorators
- Don't use `@HostBinding` / `@HostListener` — use `host` object instead
- Don't commit CSS to component `.css` files unless truly scoped; use Tailwind
- Don't forget to add translation keys to both language files
- Don't use `@Input()` / `@Output()` decorators — use `input()` / `output()` functions
- Don't use `ngClass` / `ngStyle` — use class/style bindings

## Documentation & Testing

- Keep docs in code comments near implementation
- Write specs in `.spec.ts` files; use Karma + Jasmine
- Don't generate `.md` files unless explicitly requested
