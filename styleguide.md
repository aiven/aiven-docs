# Style guide

<!-- vale off -->

Follow this style guide to keep our documentation coherent and provide a consistent reading experience to our users.
It is loosely based on [Google's style guide](https://developers.google.com/style) and partly enforced by [Vale](https://vale.sh/).

- [Minimalism](#minimalism)
- [English](#english)
- [Active voice](#active-voice)
- [Tenses](#tenses)
- [Capitalization](#capitalization)
- [Titles](#titles)
- [Links](#links)
- [Tasks and steps](#tasks-and-steps)
- [Full stops](#full-stops)
- [Writing UI instructions](#writing-ui-instructions)
- [Quotes, bold, italics, and inline code](#quotes-bold-italics-and-inline-code)
- [Politeness](#politeness)
- [Trademarks](#trademarks)
- [Documentation text styles](#documentation-text-styles)

## Minimalism

Users don't read documentation but skim it, so:

1. Go straight to the point and only provide what is necessary.
1. Keep your sentences short.
1. Use bullet lists (a lot).

Only documentation on concepts should be detailed, such as architecture overviews.
Task (_how to do..._) and reference (_raw information_) topics should be as direct as
possible.

**Important:** _Straight to the point_ doesn't mean incomplete.

## English

Think about your international readers and keep your English simple and rather formal:

1. Use the American spelling.
1. Write in simple English, but not stupid either: Do not write long sentences, do not use jargon, or use the user's jargon if you must.
1. Repeating a noun or a subject is ok. Repetition prevents misunderstandings.
1. Do not use weasel words (often, probably, possibly...).
1. Do not use adjectives to describe tasks (great, easy/easily, hard...). Technical writing does not judge complexity.
1. Use phrasal verbs with care (take off, take on, put up, put down...), they are often confusing to international readers.
1. Avoid using `need`. It's ambiguous.
1. Avoid useing `must`. Just use the imperative and save 2 words (_You must create..._ -> _Create_).
1. Avoid generic sentences that can be used for everything such as: `This section describes how to...` If a sentence can be used for everything, it's useless.
1. Do not use parenthesis. If something is so unimportant to be in parenthesis, it can probably be deleted.
1. Do not use Latin abbreviations such as `i.e` or `e.g`. `i.e`, let's use English instead: `for example`.
1. Do not describe UI elements or their location in the UI.
1. Use parallelism correctly (add to/subtract from, import into/export from, etc.).
1. Use a comma before the conjunction (and, or) that marks the final item in a list of three or more items.
1. Use prepositions consistently, for example:
   - `on the page` or `on the Features page`
   - `on the left-side menu` or `on the leftmost menu`

| Category               | Do                                            | Don't                                                                    |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| **Simple English**     | Use the Test API.                             | Utilize the Test API.                                                    |
| **Simple English**     | Import the item when the icon is green.       | The icon has turned green therefore meaning you can now import the item. |
| **Simple English**     | Import the catalog when the icon is green.    | You need to import the catalog when the icon is green.                   |
| **Phrasal verbs**      | The window appears.                           | The window pops up.                                                      |
| **Weasel word**        | Use this endpoint to implement...             | This endpoint is often useful when implementing...                       |
| **Judging complexity** | To create ABC, click...                       | To create ABC, simply click...                                           |
| **Latin**              | Set a value, for example `32`.                | You can set a value, e.g. `32` .                                         |
| **UI description**     | Click `Save`.                                 | Click the `Save` button.                                                 |
| **UI description**     | Select a value from `Suggestion`.             | Use the drop-down list called `Suggestion` to select a value.            |
| **Parallelism**        | Add points to or subtract them from...        | Add or subtract points from...                                           |
| **Punctuation**        | The card can be active, inactive, or blocked. | The card can be active, inactive or blocked.                             |

## Active voice

Use the active voice as much as possible. It reads better and sounds
more natural in most cases. To force yourself to write in active
voice, use _you_ as the subject of your sentence.

You can use the passive form for actions performed by the system.

| Do                                  | Don\'t                                     |
| ----------------------------------- | ------------------------------------------ |
| The message window appears.         | The message window is displayed.           |
| You can test notifications using... | Testing notifications can be done using... |
| The catalog is imported.            | You have imported the catalog.             |

## Tenses

1. Do not use the future tense in the documentation. We only talk about what is, not what will be, so most sentences should be written in the present tense.
1. The past is possible in certain cases but should be kept to a minimum.
1. Do not use might / shall / ought / could. Knowing things that only _might_ happen is not helpful.

|      Type       |                Do                 |                 Don't                  |                                    Comments                                    |
|-----------------|-----------------------------------|----------------------------------------|--------------------------------------------------------------------------------|
| **Future**      | Click ABC to start the import.    | Click ABC and the import will start    | When?                                                                          |
| **Future**      | Define a filter.                  | You will now define a filter.          | _now_ is useless, especially mixed with a future tense (is it now or later?)   |
| **Future**      | Click ABC...                      | You will need to click ABC...          |                                                                                |
| **Title**       | Configure the service             | Configuring the service                |                                                                                |
| **Title**       | Add a user                        | To add a user                          |                                                                                |
| **Uncertainty** | The process starts in 20 seconds. | The process might start in 20 seconds. | _Might_ leads to more questions: What happens if it doesn't? How sure is this? |

## Capitalization

Always capitalize product and feature names.

Also use a capital letter after colons (:)

- Your plan: Standard
- **Note:** This is my note.

## Titles

1. Don't use questions as titles. Example: **How does it work?**
1. Use **sentence capitalization** (only the first letter is capitalized).
1. If you have a verb in your title, use the imperative form.

| Type                     | Usage                                           | Example                             |
| ------------------------ | ----------------------------------------------- | ----------------------------------- |
| Title **without a verb** | Section explaining what something is.           | _Database sharding_                 |
| Title **with a verb**    | Usually section explaining how to do something. | _Create a service_, _Delete a pool_ |

## Links

You have 2 ways to link to a page:

1. The link text is the title of the target page.
1. The link text is the action of the sentence.

Anything else is generally inefficient and more difficult to read.

| Example             | Do                                                            | Don\'t                                        |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------- |
| **Using the title** | To learn more about API documentation, see [API reference](). | Click [here]() to see the API docs.           |
| **Call to action**  | Before you start, [install ABC]().                            | Before you start, you can read [this page](). |

## Tasks and steps

- Prefix opttional steps with `Optional:`.
- Use step results only when necessary.
- Click chains start with the first click in the UI, not the last click.

|     Example      |                 Do                 |                     Don\'t                      |
|------------------|------------------------------------|-------------------------------------------------|
| **Click chains** | Click **File** > **Save** > **OK** | Click **Save** > **OK** from the **File** menu. |

## Full stops

Full stops are used to mark the end of a sentence. A sentence is a group of words with
a least one verb (and a subject unless the verb is in the imperative/participle form).
If you use a sentence, even in a list, use a full stop.

The exception to the rule are titles. They can sometimes be sentences, but do not take
a full stop. For example, dialog titles or section titles:

- `Action required`
- `Confirm selection`
- `Integrating with the product`

## Writing UI instructions

- Use **click** for buttons.
- Use **select** for checkboxes, radio buttons, item in dropdown lists.
- Use short click chains in the order of the UI.

|        Example         |                 Do                 |                    Don\'t                     |
|------------------------|------------------------------------|-----------------------------------------------|
| **Short click chains** | Click **Action** > **Delete**.      | Click **Delete** in the **Actions** menu.    |

## Quotes, bold, italics, and inline code

Never use double-quotes (`"`) or single quotes (`'`) for anything.
Instead, use the following style in the right context:

- Bold (`**word**`): for UI elements or calls to action, and strong emphasis.
- Italics (`_word_`) for other cases. Use italics rarely.
- Inline code (`` `word` ``) for technical values or technical values to type.

| Example         | Do                                | Don\'t                              |
| --------------- | --------------------------------- | ----------------------------------- |
| UI element      | Click **Account** > **Settings**. | Click "Account" and "Settings".     |
| Code            | Set `db_id` to `ABC`.             | Set the "db_id" parameter to _ABC_. |
| Strong emphasis | Do **not** click **Delete**.      | Do _not_ click **Delete**.          |

## Politeness

Do not use **please** or any unnecessary politeness.

## Trademarks

1. Ensure the registered trademark symbol (®) is used with service names, at least for their first occurrence within the documents.
1. Use complete service names, like _Aiven for Apache Flink_, instead of _Apache Flink_ when referring to anything specific to Aiven for Apache Flink.

## Documentation text styles

| Information type  | Style       |
| ----------------- | ----------- |
| Interface element | Bold (**)   |
| User input        | Code (`)    |
| Quotes            | Italics (_) |
