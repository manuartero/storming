# Open questions

Gaps and ambiguities in the source PDFs. Each one blocks, or should shape, an issue. Ask the designers, then write the answer into the rulebook or card file and delete the entry here.

Format: the question, what the source says, and a working assumption the code may use until it is answered.

**Ask first:** [`q.event-4p-set`](#qevent-4p-set), [`q.conspiracy-vp`](#qconspiracy-vp), [`q.action-deck`](#qaction-deck), [`q.setup-cards`](#qsetup-cards). They flip who a card rewards or leave cards undefined. The rest have a safe default.

### q.action-deck

Which 5 action cards does each colour get, and which of them allow two actions?

- Source: 20 action cards, 4 sets ([Components](rulebook.md#components)); four card types ([`cards/actions.md`](cards/actions.md)); "one or two actions, depending on the card" ([`present.3.1`](rulebook.md#resolving-the-present-slot)).
- Working assumption: what `src/models/player-cards.ts` does today, one build, two military, one recruit, one diplomacy.

### q.setup-cards

What do the 20 starting-setup cards show?

- Source: they place forests, mountains and lakes ([`setup.10`, `setup.11`](rulebook.md#setup)), but no PDF lists them.
- Working assumption: `src/models/tiles.ts`, one fixed layout.

### q.event-4p-set

What are the two cards under *1 JUGADOR (4p)* in the events PDF, and when are they used?

- Source: `event.insurrection-4p` and `event.assassination-4p` ([`cards/events.md`](cards/events.md#1-jugador-4p-set)). The rulebook only names the standard three.
- Arithmetic: the standard set covers 36 of the 60 colour-aimed cards (4 colours × 3 cards × 3 copies). The other 24 fit 4 colours × 2 cards × 3 copies, so these look like extra copies for 4-player games. That clashes with [`setup.7.4p`](rulebook.md#setup), which deals from the standard three only.
- Working assumption: leave them out.

### q.event-last-player

In *Material Shortage*, who is "the last player"?

- Source: *"El último jugador"*.
- Working assumption: the last player in turn order, counted from the first player.

### q.event-replace

In *Patronage* and *Prosperity*, what does "replace" a civilian or an improvement mean?

- Source: *"sustituir"*.
- Working assumption: discard one you own and take a face-up one in its place, so the limit of two ([`recruit.civilian.2`](rulebook.md#recruit), [`build.improvement.2`](rulebook.md#build)) is kept.

### q.event-next-card

Events that act on "the next" card (*Famine*, *Truce*, *Fair Winds*, *Corruption*, *Embargo*, *Chaos*): does "next" cover the rest of this PRESENT pile, or start at the following round?

- Working assumption: the next matching card to be resolved, in this pile or a later one.

### q.civilian-sacrifice

*Sheriff*: when sacrificed to dodge an event, is the Sheriff discarded like any removed civilian?

- Working assumption: yes, to the discard pile ([`recruit.civilian.5`](rulebook.md#recruit)).

### q.philosopher-action

*Philosopher*: "you may take an action". Of any type?

- Working assumption: one action of any of the four types.

### q.theatre-count

*Theatre*: do the three revolts count from when it is built, and do revolts revealed while another player owns it count?

- Working assumption: counts only revolts revealed while you own it; the count carries over if you lose and rebuild it.

### q.library-copy

*Library*: if the copied improvement is destroyed, does the Library lose its effect until the next start of turn?

- Working assumption: yes; you may move the marker again at the start of your next turn.

### q.conspiracy-vp

*Conspiracy*: who gains the victory point, the signers or the outsiders?

- Source: *"Los jugadores ajenos al pacto pierden todas sus tropas, ganan un Punto de Victoria y el pacto se rompe"*. Grammatically the outsiders; the classification sheet ("destroys every unit and +1 VP") reads as a reward for the signers.
- Working assumption: each signer gains one victory point.

### q.no-quarter-card

*No Quarter*: "an extra military action when they play a card". Any action card, or only military ones?

- Source: the classification sheet says "after playing an action card".
- Working assumption: any action card.

### q.pact-para-2

*Military Alliance para 2* and *Reinforcements para 2*: printed card text, or a 2-signer variant?

- Source: listed under the 10 pacts in the PDF with no heading; the rulebook counts 10 pacts.
- Working assumption: alternate wording of the same two cards; implement the "para 2" meaning.

### q.rotating-vp-tie

*Rotating victory point*: who holds it when two players tie for most settlements?

- Source: "more settlements than anyone else" ([`vp.rotating`](rulebook.md#winning-the-game)).
- Working assumption: a tie never moves the point. Nobody gains it from a tie, and whoever holds it keeps it until someone has strictly more.
