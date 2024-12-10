import "./editor.scss";
import { __ } from "@wordpress/i18n";

//* React hook that is used to mark the block wrapper element.
import { useBlockProps } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { question, answers, correctAnswerIndex } = attributes;

	// State to track the selected answer
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

	// Update the question attribute
	const onChangeQuestion = (newQuestion) => {
		setAttributes({ question: newQuestion });
	};

	// Update an answer at a specific index
	const onChangeAnswer = (index, newAnswer) => {
		const newAnswers = [...answers]; // Create a copy of the current answers array
		newAnswers[index] = newAnswer; // Update the specific answer
		setAttributes({ answers: newAnswers }); // Save the updated answers
	};

	// Add a new empty answer to the answers array
	const onAddAnswer = () => {
		const newAnswers = [...answers, ""]; // Add an empty string to the array
		setAttributes({ answers: newAnswers }); // Save the updated answers
	};

	// Remove an answer from the answers array
	const onRemoveAnswer = (index) => {
		const newAnswers = answers.filter((_, i) => i !== index); // Remove the specific answer
		setAttributes({ answers: newAnswers }); // Save the updated answers

		// If the correct answer is removed, reset correctAnswerIndex if necessary
		if (correctAnswerIndex === index) {
			setAttributes({ correctAnswerIndex: null });
		} else if (correctAnswerIndex > index) {
			setAttributes({ correctAnswerIndex: correctAnswerIndex - 1 });
		}
	};

	// Mark an answer as correct
	const onMarkCorrect = (index) => {
		setAttributes({ correctAnswerIndex: index });
	};

	// Handle answer selection
	const onSelectAnswer = (index) => {
		setSelectedAnswerIndex(index);
	};

	return (
		<div {...useBlockProps()}>
			<TextControl
				label="Question:"
				value={question}
				onChange={onChangeQuestion}
			/>

			<div className="answers-section">
				{answers.map((answer, index) => (
					<div key={index} className="answer-item">
						<Flex>
							<FlexBlock>
								<TextControl
									label={`Answer ${index + 1}:`}
									value={answer}
									onChange={(newAnswer) => onChangeAnswer(index, newAnswer)}
								/>
							</FlexBlock>
							<FlexItem>
								<Button
									isDestructive
									onClick={() => onRemoveAnswer(index)}
									label="Remove Answer"
									className="remove-answer-button"
								>
									Remove
								</Button>
							</FlexItem>
							<FlexItem>
								<Button
									onClick={() => onMarkCorrect(index)}
									label="Mark as Correct"
									className="mark-correct-button"
								>
									<Icon
										icon="star-filled"
										style={{
											color: correctAnswerIndex === index ? "gold" : "gray",
										}}
									/>
								</Button>
								<Button
									className={`answer-feedback-button ${
										selectedAnswerIndex === index
											? correctAnswerIndex === index
												? "correct"
												: "incorrect"
											: ""
									}`}
									onClick={() => onSelectAnswer(index)}
								>
									{answer || "Answer"}
								</Button>
							</FlexItem>
						</Flex>
					</div>
				))}
			</div>

			<Button isPrimary onClick={onAddAnswer} className="add-answer-button">
				Add Answer
			</Button>
		</div>
	);
}
