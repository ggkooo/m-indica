import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { SkeletonBlock } from '@/components/profile/SkeletonBlock';

type SearchableSelectProps = {
  label: string;
  placeholder: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  emptyText?: string;
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function SearchableSelect({
  label,
  placeholder,
  options,
  selectedValue,
  onSelect,
  disabled,
  loading,
  emptyText,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const term = normalizeText(query);
    if (!term) {
      return options;
    }

    return options.filter((option) => normalizeText(option).includes(term));
  }, [options, query]);

  const currentLabel = selectedValue || placeholder;

  return (
    <View style={styles.selectWrap}>
      <Text style={styles.dropdownLabel}>{label}</Text>

      <Pressable
        style={[styles.selectBox, disabled && styles.selectBoxDisabled]}
        onPress={() => !disabled && setOpen((prev) => !prev)}
      >
        <Text style={[styles.selectBoxText, !selectedValue && styles.selectBoxPlaceholder]}>
          {currentLabel}
        </Text>
        <Text style={styles.selectArrow}>{open ? '▴' : '▾'}</Text>
      </Pressable>

      {open && !disabled && (
        <View style={styles.selectDropdownPanel}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar..."
            style={styles.selectSearchInput}
            placeholderTextColor="#6a7f9a"
          />

          {!!selectedValue && (
            <Pressable
              style={styles.clearOptionButton}
              onPress={() => {
                onSelect('');
                setOpen(false);
                setQuery('');
              }}
            >
              <Text style={styles.clearOptionButtonText}>Limpar seleção</Text>
            </Pressable>
          )}

          {loading && (
            <View style={styles.skeletonWrap}>
              <SkeletonBlock height={10} width="45%" borderRadius={6} />
              <SkeletonBlock height={34} borderRadius={8} />
              <SkeletonBlock height={34} borderRadius={8} />
              <SkeletonBlock height={34} width="78%" borderRadius={8} />
            </View>
          )}

          {!loading && filteredOptions.length === 0 && (
            <Text style={styles.hintText}>{emptyText ?? 'Nenhuma opção encontrada.'}</Text>
          )}

          <ScrollView style={styles.selectOptionsScroll} nestedScrollEnabled>
            {filteredOptions.map((option) => {
              const active = selectedValue === option;

              return (
                <Pressable
                  key={option}
                  style={[styles.selectOptionItem, active && styles.selectOptionItemActive]}
                  onPress={() => {
                    onSelect(option);
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <Text style={[styles.selectOptionText, active && styles.selectOptionTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectWrap: {
    gap: 6,
    zIndex: 20,
  },
  dropdownLabel: {
    color: '#355272',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#d3ddeb',
    borderRadius: 12,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#fafdff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBoxDisabled: {
    backgroundColor: '#f0f4f9',
    borderColor: '#e0e6ee',
  },
  selectBoxText: {
    color: '#12263f',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  selectBoxPlaceholder: {
    color: '#6a7f9a',
  },
  selectArrow: {
    color: '#607896',
    fontSize: 12,
    fontWeight: '700',
  },
  selectDropdownPanel: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#d9e2ee',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    gap: 8,
  },
  selectSearchInput: {
    borderWidth: 1,
    borderColor: '#d9e2ee',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: '#1f3f62',
    fontSize: 14,
    backgroundColor: '#f8fbff',
  },
  clearOptionButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d4dfec',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  clearOptionButtonText: {
    color: '#2d5885',
    fontWeight: '700',
    fontSize: 11,
  },
  selectOptionsScroll: {
    maxHeight: 170,
  },
  selectOptionItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e4ecf5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  selectOptionItemActive: {
    borderColor: '#b6d0ee',
    backgroundColor: '#eaf2fc',
  },
  selectOptionText: {
    color: '#284e75',
    fontSize: 13,
    fontWeight: '600',
  },
  selectOptionTextActive: {
    color: '#1b4f86',
  },
  hintText: {
    color: '#647a96',
    fontSize: 12,
  },
  skeletonWrap: {
    gap: 8,
  },
});
