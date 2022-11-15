import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/Logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

export function Header() {
	const example = [
		{ id: "1", title: "test1" },
		{ id: "1", title: "test1" },
		{ id: "1", title: "test1" },
	];
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova transação</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
