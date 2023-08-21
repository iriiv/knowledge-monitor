import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import styled from 'styled-components';

import { ArrowLeft, ArrowRight, CertificateCheck } from '@carbon/icons-react';
import {
	IconButton,
	ListItem,
	ProgressIndicator,
	ProgressStep,
	Slider,
	UnorderedList,
} from '@carbon/react';
import { EstimateInfoComponent } from '../components/EstimateInfoComponent';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import { EstimateContext } from '../services/Estimates/Estimate';
import { LoadingPage } from './LoadingPage';

const Wrapper = styled.div`
	max-height: 100vh;
`;

const EstimateWrapper = styled.div``;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2em 0;
`;

const ProgressBarWrapper = styled.div`
	position: absolute;
	width: 70%;
	bottom: 4em;
`;

const CriteriaWrapper = styled.div`
	padding: 1em 2em;
`;

type Estimate = {
	themeId: string;
	values: EstimateValue[];
};

type EstimateValue = {
	id: string;
	value: number;
};

const EstimatePage = () => {
	const {
		currentTopic,
		next,
		prev,
		currentIndex,
		setCurrentIndex,
		theme,
		setEstimateValue,
		currentTopicValue,

		submitEstimate,
	} = useContext(EstimateContext);

	const navigate = useNavigate();

	const [arrowDisabled, setArrowDisabled] = useState(false);

	const confirmModal = useModal({
		onSubmit: async ({ expert }) => {
			const id = await submitEstimate(expert);
			navigate(`/result/${id}`);
		},
		title: 'Сохранить',
	});

	useEffect(() => {
		if (currentIndex === 0) setArrowDisabled(true);
		else setArrowDisabled(false);
	}, [currentIndex]);

	const onSliderChange = (value: any) => {
		setEstimateValue(value.value);
	};

	if (!theme) return <LoadingPage />;
	return (
		<Wrapper>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Title>
					<h1>{theme?.title}</h1>
				</Title>
				<div>
					<IconButton
						disabled={arrowDisabled}
						kind='secondary'
						align='left'
						label='Назад'
						className='cds--btn--icon-only'
						onClick={prev}
					>
						<ArrowLeft />
					</IconButton>
					<IconButton
						kind={
							currentIndex === theme.topics.length - 1 ? 'primary' : 'secondary'
						}
						align='right'
						label={
							currentIndex === theme.topics.length - 1 ? 'Отправить' : 'Вперед'
						}
						className='cds--btn--icon-only'
						onClick={
							currentIndex === theme.topics.length - 1
								? confirmModal.openModal
								: next
						}
					>
						{currentIndex === theme.topics.length - 1 ? (
							<CertificateCheck />
						) : (
							<ArrowRight />
						)}
					</IconButton>
				</div>
			</div>
			<EstimateWrapper>
				<EstimateInfoComponent topic={currentTopic} theme={theme} />
				<h3 style={{ padding: '1em 0 0 0' }}>
					Насколько хорошо вы знаете тему?
				</h3>
				<CriteriaWrapper>
					<UnorderedList>
						<ListItem>
							<strong>1</strong> - Теоретические знания
						</ListItem>
						<ListItem>
							<strong>2</strong> - Есть практический опыт
						</ListItem>
						<ListItem>
							<strong>3</strong> - Использовал/использую на проектах
						</ListItem>
						<ListItem>
							<strong>4</strong> - Эксперт, могу обучать
						</ListItem>
					</UnorderedList>
				</CriteriaWrapper>
				<Slider
					style={{ width: '500px' }}
					onChange={onSliderChange}
					id='slider'
					labelText='Оцените свой уровень знаний'
					max={4}
					min={0}
					step={1}
					stepMultiplier={1}
					value={currentTopicValue}
					disabled={false}
					light={false}
				/>
			</EstimateWrapper>
			<ProgressBarWrapper>
				<ProgressIndicator
					currentIndex={currentIndex}
					vertical={false}
					spaceEqually
				>
					{theme?.expand?.topics &&
						theme?.expand?.topics.map((topic: any, idx: number): any => (
							<ProgressStep
								label={
									<label
										style={{ cursor: 'pointer' }}
										onClick={() => {
											setCurrentIndex(idx);
										}}
									>
										{topic.title}
									</label>
								}
								description={topic.description}
							/>
						))}
				</ProgressIndicator>
			</ProgressBarWrapper>
			<ConfirmModal {...confirmModal} />
		</Wrapper>
	);
};

export default EstimatePage;
