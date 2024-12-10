import{ useState } from 'react';
import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Heading, 
  Input, 
  Button, 
  Flex, 
  useDisclosure,
  

} from '@chakra-ui/react';
import { Select } from '@chakra-ui/select'
import { Tag,
          TagLabel,
          TagCloseButton } from "@chakra-ui/tag"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type ColumnKey = 'shortTerm' | 'mediumTerm' | 'longTerm';
type LabelKey = 'work' | 'personal' | 'health' | 'finance' | 'education';

interface Goal {
  id: string;
  text: string;
  labels: LabelKey[];
}

interface Columns {
  shortTerm: Goal[];
  mediumTerm: Goal[];
  longTerm: Goal[];
}

// Color palette for labels
const LABEL_COLORS: Record<LabelKey, string> = {
  work: 'blue',
  personal: 'green',
  health: 'red',
  finance: 'purple',
  education: 'orange',
};

const GoalView: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({
    shortTerm: [],
    mediumTerm: [],
    longTerm: [],
  });

  const [newGoal, setNewGoal] = useState<{
    text: string;
    labels: LabelKey[];
    column: ColumnKey;
  }>({
    text: '',
    labels: [],
    column: 'shortTerm',
  });

  const [editingGoal, setEditingGoal] = useState<Goal & { column: ColumnKey } | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId as ColumnKey;
    const destColumn = result.destination.droppableId as ColumnKey;

    const newColumns = { ...columns };
    const [removed] = newColumns[sourceColumn].splice(result.source.index, 1);
    newColumns[destColumn].splice(result.destination.index, 0, removed);

    setColumns(newColumns);
  };

  const addGoal = () => {
    if (!newGoal.text) return;

    const goalToAdd: Goal = {
      id: `goal-${Date.now()}`,
      text: newGoal.text,
      labels: newGoal.labels,
    };

    setColumns((prev) => ({
      ...prev,
      [newGoal.column]: [...prev[newGoal.column], goalToAdd],
    }));

    setNewGoal({ text: '', labels: [], column: 'shortTerm' });
    onClose();
  };

  const deleteGoal = (columnKey: ColumnKey, goalId: string) => {
    setColumns((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].filter((goal) => goal.id !== goalId),
    }));
  };

  const editGoal = (goal: Goal, columnKey: ColumnKey) => {
    setEditingGoal({ ...goal, column: columnKey });
    onOpen();
  };

  const updateGoal = () => {
    if (!editingGoal) return;

    setColumns((prev) => {
      const newColumns = { ...prev };
      const columnGoals = newColumns[editingGoal.column];
      const index = columnGoals.findIndex((g) => g.id === editingGoal.id);

      if (index !== -1) {
        columnGoals[index] = {
          id: editingGoal.id,
          text: editingGoal.text,
          labels: editingGoal.labels,
        };
      }

      return newColumns;
    });

    onClose();
    setEditingGoal(null);
  };

  const toggleLabel = (label: LabelKey) => {
    if (editingGoal) {
      setEditingGoal((prev) => {
        if (!prev) return null;
        const newLabels = prev.labels.includes(label)
          ? prev.labels.filter((l) => l !== label)
          : [...prev.labels, label];
        return { ...prev, labels: newLabels };
      });
    } else {
      setNewGoal((prev) => {
        const newLabels = prev.labels.includes(label)
          ? prev.labels.filter((l) => l !== label)
          : [...prev.labels, label];
        return { ...prev, labels: newLabels };
      });
    }
  };

  const renderGoalModal = () => (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter goal"
            mb={4}
            value={editingGoal ? editingGoal.text : newGoal.text}
            onChange={(e) =>
              editingGoal
                ? setEditingGoal((prev) => (prev ? { ...prev, text: e.target.value } : null))
                : setNewGoal((prev) => ({ ...prev, text: e.target.value }))
            }
          />
          <Select
            mb={4}
            value={editingGoal ? editingGoal.column : newGoal.column}
            onChange={(e) => {
              const selectedColumn = e.target.value as ColumnKey;
              editingGoal
                ? setEditingGoal((prev) => (prev ? { ...prev, column: selectedColumn } : null))
                : setNewGoal((prev) => ({ ...prev, column: selectedColumn }));
            }}
          >
            <option value="shortTerm">Short Term</option>
            <option value="mediumTerm">Medium Term</option>
            <option value="longTerm">Long Term</option>
          </Select>
          <Flex wrap="wrap" gap={2} mb={4}>
            {(Object.keys(LABEL_COLORS) as LabelKey[]).map((label) => (
              <Tag
                key={label}
                colorScheme={LABEL_COLORS[label]}
                cursor="pointer"
                onClick={() => toggleLabel(label)}
                variant={
                  (editingGoal ? editingGoal.labels : newGoal.labels).includes(label)
                    ? 'solid'
                    : 'outline'
                }
              >
                {label}
              </Tag>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={editingGoal ? updateGoal : addGoal}>
            {editingGoal ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
      <Box p={8}>
        <Heading mb={8} textAlign="center">
          Track your goals
        </Heading>
        <Button colorScheme="green" mb={4} onClick={onOpen}>
          Add New Goal
        </Button>

        <DragDropContext onDragEnd={onDragEnd}>
          <Flex justifyContent="space-between">
            {(Object.entries(columns) as Array<[ColumnKey, Goal[]]>).map(([columnKey, columnGoals]) => (
              
              <Droppable key={columnKey} droppableId={columnKey}>

                {(provided) => (
                  
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    w="20vh"
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                  >
                    {columnKey}
                    <Heading size="md" mb={4} textTransform="capitalize">
                      {columnKey.replace(/([A-Z])/g, ' $1')}
                    </Heading>
                  
                    {columnGoals.map((goal, index) => (
                      <Draggable key={goal.id} draggableId={goal.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            mb={2}
                            p={3}
                            color="black"
                            bg="white"
                            boxShadow="md"
                            borderRadius="md"
                          >
                            <Flex justifyContent="space-between" alignItems="center">
                              <VStack align="start" gap={2} w="full">
                                <Box>{goal.text}</Box>
                                <Flex wrap="wrap" gap={2}>
                                  {goal.labels.map((label) => (
                                    <Tag key={label} size="sm" colorScheme={LABEL_COLORS[label]}>
                                      {label}
                                    </Tag>
                                  ))}
                                </Flex>
                              </VStack>
                              <Flex direction="column">
                                <Button
                                  size="xs"
                                  colorScheme="blue"
                                  mb={1}
                                  onClick={() => editGoal(goal, columnKey)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="xs"
                                  colorScheme="red"
                                  onClick={() => deleteGoal(columnKey, goal.id)}
                                >
                                  Delete
                                </Button>
                              </Flex>
                            </Flex>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            ))}
          </Flex>
        </DragDropContext>

        {renderGoalModal()}
      </Box>
  );
};

export default GoalView;