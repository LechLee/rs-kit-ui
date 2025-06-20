# Documentation Content Guidelines

## Overview

This document establishes standards for writing, structuring, and maintaining high-quality documentation for UI kit components. These guidelines ensure consistency, clarity, and usefulness across all documentation.

## Writing Principles

### 1. **Developer-First Approach**
- **Write for practitioners**: Assume readers are building real applications
- **Show, don't just tell**: Provide working code examples for every concept
- **Context matters**: Explain when and why to use each component
- **Progressive disclosure**: Start simple, then show advanced usage

### 2. **Clarity and Conciseness**
- **Clear headings**: Use descriptive, scannable headings
- **Short paragraphs**: Keep explanations focused and digestible
- **Active voice**: Use active voice for clarity and directness
- **Plain language**: Avoid jargon; explain technical terms when necessary

### 3. **Consistency and Standards**
- **Uniform structure**: Follow the established template for all components
- **Consistent terminology**: Use the same terms for the same concepts
- **Code style**: Follow established coding conventions in all examples
- **Voice and tone**: Maintain a helpful, professional, and approachable tone

## Documentation Structure

### Required Sections

Every component documentation must include:

1. **Component Header** - Name, version, description, and badges
2. **Overview** - What it is, when to use it, key features
3. **Installation** - Import statements and basic setup
4. **API Reference** - Props, variants, types, and methods
5. **Basic Usage** - Simple, common examples
6. **Advanced Examples** - Complex use cases and compositions
7. **Accessibility** - WCAG compliance and best practices
8. **Related Components** - Links to complementary components

### Optional Sections

Include when relevant:

- **Migration Guide** - For components with breaking changes
- **Performance Notes** - For components with specific performance considerations
- **Testing Guide** - For components requiring special testing approaches
- **Troubleshooting** - For components with common issues or edge cases

## Content Standards

### Frontmatter Requirements

```yaml
---
component: ComponentName
component_version: x.y.z
documentation_version: x.y.z
last_updated: YYYY-MM-DDTHH:mm:ssZ
auto_generated: true
category: forms|layout|navigation|feedback|data-display|utility|custom
tags: [tag1, tag2, tag3]
status: stable|beta|alpha|deprecated|experimental
---
```

### Component Header Format

```markdown
# ComponentName

> **Version**: x.y.z | **Last Updated**: Month DD, YYYY

[Status badges and category indicators]

Brief, one-sentence description of what the component does and its primary purpose.
```

### Overview Section Guidelines

**Structure**:
```markdown
## Overview

### What it is
Clear definition of the component's purpose and functionality.

### When to use
Specific use cases and scenarios where this component is appropriate.

### Key features
- Bullet list of main capabilities
- Focus on developer and user benefits
- Highlight unique or standout features
```

**Example**:
```markdown
## Overview

### What it is
The Button component is a versatile interactive element that triggers actions when clicked. Built on Radix UI primitives, it provides consistent styling, accessibility features, and multiple variants for different use cases.

### When to use
- Triggering form submissions or data operations
- Navigating between pages or sections
- Opening dialogs, modals, or other UI elements
- Confirming or canceling user actions

### Key features
- **Multiple variants**: Default, outline, ghost, destructive, secondary, and link styles
- **Size options**: Small, default, and large sizes for different contexts
- **Loading states**: Built-in support for async operations with loading indicators
- **Full accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Icon support**: Easy integration with icons before or after text
```

### API Reference Standards

#### Props Documentation

```markdown
## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'destructive' \| 'secondary' \| 'link'` | `'default'` | Visual style variant of the button |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `children` | `ReactNode` | - | Button content |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |

### Required Props
- None (all props are optional)

### Accessibility Props
| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | Accessible name when button text isn't descriptive |
| `aria-describedby` | `string` | References additional description element |
```

#### Variant Documentation

```markdown
### Variants

#### Visual Variants
- **`default`** - Primary action button with solid background
- **`outline`** - Secondary action with border and transparent background
- **`ghost`** - Minimal styling with hover effects
- **`destructive`** - For dangerous or irreversible actions (red theme)
- **`secondary`** - Alternative secondary styling
- **`link`** - Text-only appearance for navigation

#### Size Variants
- **`sm`** - Compact size for dense interfaces (32px height)
- **`default`** - Standard size for most use cases (40px height)
- **`lg`** - Prominent size for primary actions (44px height)
```

### Code Example Standards

#### Basic Usage Examples

```markdown
## Basic Usage

### Simple Button
```tsx
import { Button } from '@rs-kit/ui-kit'

export function SimpleExample() {
  return <Button>Click me</Button>
}
```

### Button Variants
```tsx
import { Button } from '@rs-kit/ui-kit'

export function VariantExamples() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}
```
```

#### Advanced Examples

```markdown
## Advanced Examples

### Form Integration with Loading State
```tsx
import { useState } from 'react'
import { Button } from '@rs-kit/ui-kit'
import { Loader2Icon } from 'lucide-react'

export function FormWithLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await submitForm()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2Icon className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Form'
        )}
      </Button>
    </form>
  )
}
```

**Key Features Demonstrated:**
- Loading state management
- Conditional content rendering
- Icon integration
- Form submission handling
- Proper accessibility during loading
```

### Accessibility Guidelines

```markdown
## Accessibility

### WCAG Compliance
This component meets WCAG 2.1 AA standards:
- ✅ **Color contrast**: All variants meet 4.5:1 contrast ratio
- ✅ **Keyboard navigation**: Full keyboard support with focus indicators
- ✅ **Screen readers**: Proper semantic markup and ARIA attributes
- ✅ **Touch targets**: Minimum 44x44px touch target size

### Best Practices

#### Descriptive Text
```tsx
// ✅ Good - Clear action description
<Button>Save Changes</Button>
<Button>Delete Account</Button>

// ❌ Avoid - Vague text
<Button>Click Here</Button>
<Button>Submit</Button>
```

#### Loading States
```tsx
// ✅ Good - Clear loading feedback
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2Icon className="w-4 h-4 animate-spin" />
      Saving...
    </>
  ) : (
    'Save Changes'
  )}
</Button>

// ❌ Avoid - No loading feedback
<Button disabled={isLoading}>Save Changes</Button>
```

#### Icon-Only Buttons
```tsx
// ✅ Good - Accessible label provided
<Button aria-label="Delete item">
  <TrashIcon className="w-4 h-4" />
</Button>

// ❌ Avoid - No accessible name
<Button>
  <TrashIcon className="w-4 h-4" />
</Button>
```

### Testing
- **Keyboard**: Tab navigation, Enter/Space activation
- **Screen reader**: Verify announcements and state changes
- **High contrast**: Test in high contrast mode
- **Touch**: Verify touch targets on mobile devices
```

## Writing Style Guide

### Voice and Tone

**Voice Characteristics**:
- **Helpful**: Anticipate developer needs and provide solutions
- **Direct**: Get to the point quickly and clearly
- **Professional**: Maintain technical accuracy and credibility
- **Approachable**: Use conversational tone without being casual

**Tone Guidelines**:
- **Instructional content**: Clear, authoritative, step-by-step
- **Explanatory content**: Conversational, educational
- **Reference content**: Precise, comprehensive, organized
- **Error/troubleshooting**: Empathetic, solution-focused

### Language Conventions

#### Terminology
- **Component** (not "element" or "widget")
- **Props** (not "properties" or "attributes")
- **Variant** (not "type" or "style")
- **Example** (not "demo" or "sample")
- **Implementation** (not "code" when referring to usage)

#### Code References
- Use `backticks` for inline code, prop names, and values
- Use **bold** for emphasis on important concepts
- Use *italics* sparingly, only for subtle emphasis

#### Action Words
- **Use**: "Click the button" (not "Press" or "Hit")
- **Set**: "Set the variant prop" (not "Pass" or "Give")
- **Import**: "Import the component" (not "Include" or "Add")
- **Configure**: "Configure the props" (not "Setup" or "Initialize")

### Common Patterns

#### Introducing Examples
```markdown
// ✅ Good patterns
Here's a basic implementation:
The following example demonstrates:
To achieve this pattern:

// ❌ Avoid
Let's look at this code:
Check out this example:
```

#### Explaining Code
```markdown
// ✅ Good - Explain the why
This example uses the `loading` prop to disable the button and show a spinner during async operations, providing clear feedback to users.

// ❌ Avoid - Just describing what
This code sets loading to true and shows a spinner.
```

#### Linking Between Sections
```markdown
// ✅ Good - Helpful cross-references
For more complex form patterns, see the [Form component documentation](../forms/form.md).
This pairs well with the [Input component](./input.md) for form submissions.

// ❌ Avoid - Vague references
See other docs for more info.
```

## Quality Standards

### Content Quality Checklist

Before publishing any documentation:

#### ✅ **Structure and Organization**
- [ ] Follows standard template structure
- [ ] All required sections present
- [ ] Clear, descriptive headings
- [ ] Logical information flow

#### ✅ **Code Examples**
- [ ] All examples compile without errors
- [ ] Examples demonstrate real-world usage
- [ ] Progressive complexity from basic to advanced
- [ ] Proper imports and dependencies shown

#### ✅ **Accessibility**
- [ ] WCAG compliance information provided
- [ ] Accessibility best practices documented
- [ ] Common accessibility pitfalls addressed
- [ ] Testing guidance included

#### ✅ **Accuracy**
- [ ] Technical information verified
- [ ] Props and API reference accurate
- [ ] Version information current
- [ ] Links functional and relevant

#### ✅ **Completeness**
- [ ] All major use cases covered
- [ ] Common questions anticipated and answered
- [ ] Related components referenced
- [ ] Migration path provided (if applicable)

### Review Process

1. **Automated Validation**: All examples must pass compilation and linting
2. **Accessibility Check**: Verify WCAG compliance and best practices
3. **Peer Review**: Technical accuracy and completeness review
4. **User Testing**: Validate with actual developers using the documentation

This comprehensive content guideline ensures that all documentation maintains high standards of quality, usefulness, and consistency across the entire UI kit library.