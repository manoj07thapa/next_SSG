import MicrophoneType from '../../../models/Microphone';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import openDB from '../../openDB';

// export type MicrophoneDetailProps = MicrophoneType;

export interface MicrophoneDetailProps extends MicrophoneType {}

export default function MicrophoneDetail({ id, brand, model, price, imageUrl }: MicrophoneDetailProps) {
	const router = useRouter();
	if (router.isFallback) {
		// isFallBack will be true for the ids which are not avillable in path array in getStaticPath function
		return (
			<div>
				<h2>Loading...sorry for the wait</h2>
			</div>
		);
	}
	return (
		<div>
			<p>{id}</p>
			<p>{brand}</p>
			<p>{model}</p>
			<p>{price}</p>
			<p>{imageUrl}</p>
		</div>
	);
}

export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (ctx) => {
	const id = ctx.params.id as string;
	const db = await openDB();
	const microphone = await db.get('select * from microphone where id=?', +id); //we can directly query database while using getStaticProps no need to have api in case of get
	return { props: microphone };
};

/*params id in path array will load in build time and other ids at run time
this feature is handy to quikly show  frequently visited pages to user */
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	const db = await openDB();
	const microphones = await db.all('select * from microphone');
	const micIds = microphones.map((mic) => {
		return {
			params: { id: mic.id.toString() }
		};
	});
	return {
		fallback: true,
		paths: micIds // params we get in ctx object in getStaticProps function
	};
};
