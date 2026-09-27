# Rule book

The full rules of Storming!, transcribed into English from the designers' Spanish PDFs. This folder is the source of truth; the PDFs are no longer in the repo.

| File                                             | What                                                        | Source PDF                               |
| ------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------- |
| [`rulebook.md`](rulebook.md)                     | Setup, round, actions, revolts, events, winning             | `REGLAS STORMING.pdf`                    |
| [`cards/actions.md`](cards/actions.md)           | The four action cards, revolt and invention                 | `CARTAS ACCIONES.pdf`                    |
| [`cards/events.md`](cards/events.md)             | 28 general events, colour-aimed events                      | `CARTAS SUCESOS.pdf`                     |
| [`cards/civilians.md`](cards/civilians.md)       | 10 civilians                                                | `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`   |
| [`cards/improvements.md`](cards/improvements.md) | 10 kingdom improvements                                     | `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`   |
| [`cards/pacts.md`](cards/pacts.md)               | 10 pacts                                                    | `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`   |
| [`cards/by-mechanic.md`](cards/by-mechanic.md)   | Civilians, improvements and pacts grouped by what they touch | `clasificación cartas storming.pdf`      |
| [`glossary.md`](glossary.md)                     | Spanish → English → code names                              |                                          |
| [`open-questions.md`](open-questions.md)         | Gaps in the sources, each with a working assumption         |                                          |
| [`icons/`](icons/)                               | Build, move and recruit icons from the original             |                                          |

## IDs

Every rule and card has a stable ID. Grep for it; cite it everywhere.

| Kind          | Pattern                   | Example                                    |
| ------------- | ------------------------- | ------------------------------------------ |
| Rule          | `<section>[.<topic>].<n>` | `build.village.2`, `move.4`, `setup.7.4p`  |
| Victory point | `vp.<source>`             | `vp.mine`                                  |
| Card          | `<kind>.<slug>`           | `event.fire`, `civilian.spy`, `pact.blockade` |
| Open question | `q.<slug>`                | `q.conspiracy-vp`                          |

- IDs never change meaning. A reworded rule keeps its ID; a new rule takes the next free number; a removed rule's ID is not reused.
- Card slugs come from the English name. The Spanish name sits next to it in every table.
- Each card file ends with the original Spanish text, verbatim, for when the translation is in doubt.

## Turning rules into work

1. **Find the rule.** Grep the ID or the Spanish/English term (`rg "pact.blockade|Bloqueo" rule-book/`).
2. **Check the code.** Rules belong in `src/game-logic/` ([AGENTS.md](../AGENTS.md#architecture)). Search it for the ID and the code name from [`glossary.md`](glossary.md).
3. **Open the issue.** One rule or one card per issue. Put the IDs in the title and quote the rule text in the body:

   ```
   feat(rules): build.village.2 no village next to another settlement
   ```

   ```
   Rule: `build.village.2`: You cannot build it in a region adjacent to another settlement.
   Today: the build options offer adjacent regions.
   Done when: game-logic rejects them, with a test titled after the rule.
   ```

   A behaviour that differs from the rule is a `fix`; a missing rule or card is a `feat`. An `open-questions.md` entry that blocks the work goes in the issue too.
4. **Cite the ID in code and tests.** A comment `// rules: attack.5.2` above the check; a test title that names the rule. `grep -rn "build.village" src/` then shows everything that implements it.
5. **Answer a question, update the docs.** When the designers settle an `open-questions.md` entry, write the answer into the rulebook or card file in the same PR and delete the entry.
