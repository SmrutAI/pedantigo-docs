---
sidebar_position: 100
---

# Changelog

All notable changes to Pedantigo are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.2] - 2025-12-20

### Changed

* docs: improve documentation discoverability and examples by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/4
* feat(extras): implement ExtraAllow mode for capturing unknown JSON fields by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/5

---

## [0.1.1] - 2025-12-20

### Changed

* feat: custom struct tag support + CI/CD improvements by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/1
* fix: flaky test due to map iteration order by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/2
* test: improve coverage for deserialize and schemagen packages by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/3

---

## [0.1.0] - 2024-12-18

Initial release of Pedantigo - Pydantic-inspired validation for Go.

### Added

#### Core Validation
- Struct tag-based validation with `pedantigo:"..."` tags
- 100+ built-in validation constraints
- Detailed error messages with field paths
- Support for nested structs and slices

#### Simple API (Recommended)
- `Unmarshal[T]()` - Parse JSON and validate in one call
- `NewModel[T]()` - Create validated instances from JSON, maps, or structs
- `Validate[T]()` - Validate existing struct instances
- `Schema[T]()` - Get cached JSON Schema
- `SchemaJSON[T]()` - Get JSON Schema as bytes
- `Marshal[T]()` - Validate and marshal to JSON
- `Dict[T]()` - Convert struct to map

#### Validator API (Advanced)
- `Validator[T]` struct for custom configurations
- `ValidatorOptions` for strict mode, extra fields handling
- `ExtraFieldsMode`: Ignore, Forbid, or Allow extra JSON fields

#### JSON Schema Generation
- Automatic generation from struct definitions
- 240x speedup with caching (via `SchemaRegistry`)
- OpenAPI 3.0 compatible output

#### Streaming Validation
- `StreamParser` for partial JSON validation
- Real-time validation of LLM streaming responses
- Progress callbacks for incremental updates

#### Discriminated Unions
- `Union[A, B, C]` type for type-safe unions
- Automatic discriminator detection
- JSON Schema `oneOf` support

#### Field Types
- `Secret[T]` - Masks sensitive values in logs/JSON
- Pointer support for optional fields
- Custom type support via `Validatable` interface