---
sidebar_position: 100
---

# Changelog

All notable changes to Pedantigo are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.3] - 2026-09-03

### Changed

* Precomputed the JSON deserialize plan at validator-creation time (instead of per-call reflection), and added safe handling for recursive types via register-before-populate back-edges with a pointer-cycle guard and a configurable max recursion depth (default 3) — moving heavy reflection work out of the hot path and into `New[T]()`, by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/29
* Clarified in docs that `required` is enforced only by `Unmarshal`/`NewModel`, not by `StructPartial`/`StructExcept`, by @tushar2708

---

## [2.1.2] - 2026-09-02

### Changed

* Fixed custom (de)serialization support by introducing a `WalkerDecoder` interface, letting a type control how it's populated from an already-decoded JSON value during `Unmarshal` — nested structs it delegates back through still get full required/default/constraint enforcement; also fixed a nil-slice-element panic and made slice validation aggregate errors across all elements instead of stopping at the first by @tushar2708
* Added test coverage for the `UnmarshalInto`/`ValidateInto` type-erased entry points against `Register()`ed types by @tushar2708

---

## [2.1.1] - 2026-08-17

### Changed

* Fixed Echo and Gin plugin module paths that embedded `/v2` in the middle instead of at the end, violating Go's major-version-suffix rule and permanently capping both plugins at implicit v0/v1 — moved to `plugins/web/pedantigoecho/v2` and `plugins/web/pedantigogin/v2`, with package names renamed to `pedantigoecho`/`pedantigogin` to avoid colliding with `labstack/echo`/`gin-gonic/gin` by @tushar2708
* Retracted v2.1.0 in go.mod — its README/docs pointed at the `plugins/web/echo/v2.1.0` and `plugins/web/gin/v2.1.0` tags, both of which used the broken module paths above and have since been deleted, so following v2.1.0's own install instructions failed by @tushar2708
## Breaking Changes
* Import paths for the Echo and Gin plugins change to `github.com/SmrutAI/pedantigo/plugins/web/pedantigoecho/v2` and `github.com/SmrutAI/pedantigo/plugins/web/pedantigogin/v2`

---

## [2.1.0] - 2026-08-17

### Changed

* Added a Gin plugin (`plugins/web/gin`) that installs pedantigo into Gin's `codec/json.API` and `binding.Validator` hooks, giving automatic request validation on `ShouldBindJSON`/`Query`/`Form`/`Header` — mirrors the existing Echo Binder plugin by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/27
* Fixed a bug where `RegisterValidation`/`RegisterAlias`/`RegisterTagNameFunc` could silently evict `Register()`'d framework validators, by splitting the core cache into a permanent registry and a disposable Simple API cache by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/27
* Added `ValidateInto`, a type-erased validation lookup for framework adapters that returns a clear error on non-pointer/nil input instead of silently reporting success by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/27
* Made the `Register()` tag-name check race-free via atomic compare-and-swap, and pedantigo now enforces a single struct-tag name across all `Register()`'d validators in a process by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/27
* Documented the Echo Binder plugin in the README by @tushar2708
* Removed the dead Go Report Card badge, added a dedicated Lint workflow/badge, and documented that MAC-address parsing behavior depends on the consuming app's Go toolchain, not pedantigo's `go.mod` floor by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/26
* First release where `plugins/web/echo` and `plugins/web/gin` are tagged as independently installable Go modules (`plugins/web/echo/v2.1.0`, `plugins/web/gin/v2.1.0`) — earlier releases only tagged the root module, so a pinned `go get` of either plugin wasn't possible before now

---

## [2.0.1] - 2026-08-08

### Changed

* Retracted v2.0.0 in `go.mod` — it was published with a stale pre-restructure layout (bare `validator.go` at module root, before the move to the `validator/` subpackage) that got permanently cached on the public Go module proxy before the fix landed. v2.0.1 is the corrected release; use this version or later by @tushar2708

---

## [2.0.0] - 2026-08-06

### Changed

## Breaking Changes
* Default struct tag changed from `pedantigo` to `validate` — rename tags to `validate:` or call `SetTagName("pedantigo")` to keep v1 behavior.
* Import path changed to `github.com/SmrutAI/pedantigo/v2` (Go semantic import versioning for v2+).
* feat!: change default struct tag from pedantigo to validate, feat!: bump module to v2 for pedantigo/v2 import path, ci: pin golangci-lint to go1.25.12 via GOTOOLCHAIN, bump to v2.12.2 by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/22
* Update README with v2 breaking change details by @tushar2708 in 4922f87
* docs: fix import path casing and missing v2 suffix in code examples by @tushar2708 in 8d4b259
* test: cover pedantigo as an explicit custom tag name by @tushar2708 in 46f1a03

---

## [1.1.4] - 2026-06-21

### Changed

Release v1.1.4 with schema improvements, omitempty support, and JSON array examples syntax

---

## [1.1.3] - 2026-02-04

### Changed

## What's Changed
* test: comprehensive test coverage improvements with lint fixes by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/13
* feat(schema): add SchemaLLM methods for LLM API compatibility by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/14
* fix(deserialize): apply defaults to nested struct fields by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/18
* fix(validator): prevent stack overflow on circular type refs and Validatable re-entrancy by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/19
## What's Changed
* test: comprehensive test coverage improvements with lint fixes by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/13
* feat(schema): add SchemaLLM methods for LLM API compatibility by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/14
* fix(deserialize): apply defaults to nested struct fields by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/18
* fix(validator): prevent stack overflow on circular type refs and Validatable re-entrancy by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/19

---

## [1.1.2] - 2026-01-06

### Changed

## What's Changed
* fix(constraints): support decimal values in min/max constraints by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/10
* test(dive): comprehensive dive tests for all constraints by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/11
* feat(constraints): implement skip_unless with SkipConstraint interface by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/12

---

## [1.1.1] - 2026-01-05

### Changed

## What's Changed
* fix(required): allow zero values when JSON key is present in nested structs by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/9

---

## [1.1.0] - 2025-12-27

### Changed

## What's Changed
* feat(constraints): add validator-compatible constraints and APIs by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/8

---

## [1.0.0] - 2025-12-21

### Changed

## What's Changed
* feat: add go-playground/validator v10 compatible constraints and features by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/6
* test(schema): add JSON Schema spec compliance validation by @tushar2708 in https://github.com/SmrutAI/pedantigo/pull/7

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